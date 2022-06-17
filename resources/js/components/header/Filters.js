import { useEffect, useState } from "react";
import { useTasks } from "../../contexts/TasksContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../../api";

const Filters = () => {
    const [availableStatuses, setAvailableStatuses] = useState([]);
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [filterData, setFilterData] = useState({
        filterType: null,
        filterValue: null,
    });
    const { initiateTasks } = useTasks();

    const filterTasks = () => {
        const { filterType, filterValue } = filterData;

        api.filterTasks(filterType, filterValue).then((res) =>
            initiateTasks(res.data)
        );
    };

    // Trigger filter
    useEffect(() => {
        if (filterData.filterType === null || filterData.filterValue === null)
            return;

        filterTasks();
    }, [filterData]);

    // Set filter data after we have a range of dates
    useEffect(() => {
        if (dateRange[0] === null || dateRange[1] === null) return;

        setFilterData({
            filterType: "filter_date",
            filterValue: dateRange,
        });
    }, [dateRange]);

    // Fetch available statuses
    useEffect(() => {
        api.getFilters().then((res) => setAvailableStatuses(res.data.statuses));
    }, []);

    return (
        <div className="filters">
            <h2 className="filter-by">Filter by</h2>
            <div className="filters-form">
                <label>
                    <select
                        onChange={(e) =>
                            setFilterData({
                                filterType: "filter_status",
                                filterValue: e.target.value,
                            })
                        }
                    >
                        <option value="All">All</option>
                        {availableStatuses.map((status) => (
                            <option value={status} key={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                    Status
                </label>
                <label>
                    <DatePicker
                        onChange={(dates) => setDateRange(dates)}
                        dateFormat="dd/MM/yyyy"
                        minDate={new Date()}
                        onChangeRaw={(e) => e.preventDefault()}
                        selectsRange={true}
                        startDate={startDate}
                        endDate={endDate}
                    />
                    Date
                </label>
            </div>
        </div>
    );
};

export default Filters;
