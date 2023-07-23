import React from "react";
import { Table as TableAntd } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { routerActions } from "../../features/router/routerSlice";
import { requestListActions, requestListLoading, selectListRequests } from "../../features/requestList/requestListSlice";

const Table = () => {
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);
  const loading = useSelector(requestListLoading);
  const requests = useSelector(selectListRequests);
  


  React.useEffect(() => {
    dispatch(requestListActions.fetchRequestList());
  }, [dispatch]);

  const columns = [
    {
      title: "Маршрут",
      dataIndex: "name",
      render: (text, record) => {
        return (
          <p>{text}</p>
        )
      },
    },
    {
      title: "Точка 1",
      dataIndex: "original",
      render: (text, record) => {
        return (
          <p>{record.original[0]} <br/> {record.original[1]}</p>
        );
      },
    },
    {
      title: "Точка 2",
      dataIndex: "intermediate",
      render: (text, record) => {
        return (
          <p>{record.intermediate[0]} <br/> {record.intermediate[1]}</p>
        );
      },
    },
    {
      title: "Точка 3",
      dataIndex: "destination",
      render: (text, record) => {
        return (
          <p>{record.destination[0]} <br/> {record.destination[1]}</p>
        );
      },
    },
  ];

  return (
    <TableAntd
      loading={loading}
      scroll={{ x: "max-content" }}
      onRow={(record, index) => {
        return {
          onClick: () => {
            dispatch(
              routerActions.fetchRoute({
                original: record.original,
                intermediate: record.intermediate,
                destination: record.destination,
              })
            );
            setSelectedRowKeys([index + ""]);
          },
        };
      }}
      rowSelection={{ selectedRowKeys }}
      rowClassName={() => "rowClassName"}
      columns={columns}
      dataSource={requests}
      pagination={false}
    ></TableAntd>
  );
};

export default Table;
