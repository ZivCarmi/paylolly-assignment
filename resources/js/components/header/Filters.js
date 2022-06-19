import { useEffect, useState } from "react";
import { useTasks } from "../../contexts/TasksContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../../api";
import style from "../../css/Filters.module.css";

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

    useEffect(() => {
        // Reset filter by date
        if (
            filterData.filterType === "filter_date" &&
            dateRange[0] === null &&
            dateRange[1] === null
        ) {
            setFilterData({ ...filterData, filterValue: "All" });
        }

        if (dateRange[0] === null || dateRange[1] === null) return;

        // Set filter data after we have a range of dates
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
        <div className={style.filtersContainer}>
            <h2 className={style.filtersTitle}>Filter by</h2>
            <div className={style.filtersForm}>
                <label className={style.filterLabel}>
                    Status
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
                </label>
                <label className={style.filterLabel}>
                    Date
                    <DatePicker
                        onChange={(dates) => setDateRange(dates)}
                        dateFormat="dd/MM/yyyy"
                        minDate={new Date()}
                        onChangeRaw={(e) => e.preventDefault()}
                        selectsRange={true}
                        startDate={startDate}
                        endDate={endDate}
                        isClearable
                    />
                </label>
            </div>
        </div>
    );
};

export default Filters;
