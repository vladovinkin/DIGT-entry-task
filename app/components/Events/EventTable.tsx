import PropTypes, { any } from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { AutoSizer, Column, Table } from "react-virtualized";
import { removeAllEvents } from "../../AC/eventsActions";
import { filteredEventsSelector } from "../../selectors/eventsSelectors";
import "../../table.global.css";
import { mapToArr } from "../../utils";
import SortDirection from "../Sort/SortDirection";
import SortIndicator from "../Sort/SortIndicator";
import { resolve } from "url";

type TSortDirection = "ASC" | "DESC" | undefined;

interface IEventTableProps {
  eventsMap: any;
}

interface IEventTableDispatch {
  removeAllEvents: () => void;
}

interface IEventTableState {
  disableHeader: boolean;
  foundEvents: number[];
  scrollToIndex: number;
  sortBy: string;
  sortDirection: TSortDirection;
  sortedList: any;
}

class EventTable extends React.Component<IEventTableProps & IEventTableDispatch, IEventTableState> {
  static contextTypes = {
    locale: PropTypes.string,
  };

  constructor(props: IEventTableProps & IEventTableDispatch) {
    super(props);

    const sortBy = "eventDate";
    const sortDirection = SortDirection.DESC;
    const sortedList = this.sortList({ sortBy, sortDirection });

    this.state = {
      disableHeader: false,
      foundEvents: [],
      scrollToIndex: 0,
      sortBy,
      sortDirection,
      sortedList,
    };
  }

  render() {
    const { locale } = this.context;
    const { disableHeader, foundEvents, scrollToIndex, sortBy, sortDirection, sortedList } = this.state;

    const rowGetter = ({ index }: { index: number }) => this.getDatum(this.state.sortedList, index);

    return (
      <React.Fragment>
        <div style={{ display: "flex" }}>
          <div style={{ flex: "1 1 auto", height: "calc(100vh - 110px)" }}>
            <AutoSizer>
              {({ height, width }) => (
                <Table
                  ref="Table"
                  disableHeader={disableHeader}
                  height={height}
                  width={width}
                  headerHeight={30}
                  noRowsRenderer={this.noRowsRenderer}
                  headerClassName={"headerColumn"}
                  rowHeight={45}
                  rowClassName={this.rowClassName}
                  overscanRowCount={5}
                  rowGetter={rowGetter}
                  rowCount={sortedList.size}
                  scrollToIndex={scrollToIndex}
                  sort={this.sort}
                  sortBy={sortBy}
                  sortDirection={sortDirection}
                >
                  <Column
                    cellRenderer={({ cellData }) => {
                      return (new Date(cellData)).toLocaleDateString(locale, {
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        month: "numeric",
                        year: "numeric",
                      });
                    }}
                    dataKey="eventDate"
                    disableSort={false}
                    headerRenderer={this.headerRenderer}
                    width={width * 0.2}
                    label="Дата"
                  />
                  <Column
                    dataKey="eventText"
                    disableSort={true}
                    headerRenderer={this.headerRenderer}
                    width={width * 0.8}
                    label="Описание"
                  />
                </Table>
              )}
            </AutoSizer>
          </div>
        </div>
        <a className="btn waves-effect waves-light" onClick={this.handleButtonRemoveAllEvents}>Очистить список</a>
      </React.Fragment>
    );
  }

  handleScrollToBefore = () => {
    const { foundEvents, scrollToIndex } = this.state;

    if (foundEvents.indexOf(scrollToIndex) - 1 >= 0) {
      this.scrollToRow(foundEvents[foundEvents.indexOf(scrollToIndex) - 1]);
    }
  }

  handleScrollToNext = () => {
    const { foundEvents, scrollToIndex } = this.state;

    if (foundEvents.indexOf(scrollToIndex) + 1 < foundEvents.length) {
      this.scrollToRow(foundEvents[foundEvents.indexOf(scrollToIndex) + 1]);
    }
  }

  getDatum = (list: any, index: number) => {
    const arr = mapToArr(list);

    return arr[index];
  }

  rowClassName = ({ index }: { index: number }) => {
    const { foundEvents, sortedList} = this.state;
    
    if (index < 0) {
      return "headerRow";
    } else {
      const nowDate = new Date();
      const {eventDate} = this.getDatum(sortedList, index);

      let rowClassName = index % 2 === 0 ? "evenRow" : "oddRow";
      
      if (foundEvents.indexOf(index) >= 0) {
        rowClassName += " foundEvent";
      }

      if (nowDate.getTime() > Date.parse(eventDate)) { 
        rowClassName += " passedEvent";
      }

      return rowClassName;
    }
  }

  sort = ({ sortBy, sortDirection }: { sortBy: string, sortDirection: TSortDirection }) => {
    const sortedList = this.sortList({ sortBy, sortDirection });

    this.setState({ sortBy, sortDirection, sortedList });
  }

  sortList = ({ sortBy, sortDirection }: { sortBy: string, sortDirection: TSortDirection }) => {
    const { eventsMap } = this.props;

    return eventsMap
      .sortBy((item: any) => item[sortBy])
      .update(
        // tslint:disable-next-line:no-shadowed-variable
        (eventsMap: any) => (sortDirection === SortDirection.DESC ? eventsMap.reverse() : eventsMap),
      );
  }

  headerRenderer = ({ dataKey, label, sortBy, sortDirection }: { dataKey?: string, label?: string, sortBy?: string, sortDirection?: TSortDirection }) => {
    return (
      <React.Fragment>
        {label}
        {sortBy === dataKey && <SortIndicator sortDirection={sortDirection} />}
      </React.Fragment>
    );
  }

  noRowsRenderer = () => {
    return <div className={"noRows"}>Нет событий</div>;
  }

  scrollToRow = (index: number) => {
    this.setState({ scrollToIndex: index });
  }

  handleButtonRemoveAllEvents = () => {
    this.props.removeAllEvents();
  }
}

export default connect((state) => ({
  eventsMap: filteredEventsSelector(state),
}), { removeAllEvents })(EventTable);
