import React, { useState, useEffect } from "react";
import { userApi } from "../../../api/userApi";
import { combieImg } from "../../../utils/index";
import Paging from "../../Paging/Paging";
import dateFormat from "dateformat";
import { useHistory } from "react-router-dom";

function MyOrderProfile(props) {
  const [res, setRes] = useState({
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
  });
  const history = useHistory();
  const [pageIndex, setPageIndex] = useState(1);

  useEffect(() => {
    if (props.activeTab === 2)
      userApi.getMyOrder({ page: pageIndex - 1 }).then((res) => setRes(res));
  }, [pageIndex, props.activeTab]);

  return (
    <>
      <div className="courses-filter bg-gray" style={{ padding: "5px" }}>
        <div className="row align-items-center bg-orange" style={{ margin: "0px", minHeight: "50px" }}>
          <div className="col-md-12 col-lg-2 col-sm-12 text-center">
            <h6>Sản phẩm</h6>
          </div>
          <div className="col-md-12 col-lg-3 col-sm-12 text-center">
            <div className="row">
              <div className="col-md-12 col-lg-7 col-sm-12 text-center">
                <h6>Tổng tiền</h6>
              </div>
              <div className="col-md-12 col-lg-5 col-sm-12 text-center">
                <h6>Hình thức</h6>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-3 col-sm-12 text-center">
            <div className="row">
              <div className="col-md-12 col-lg-6 col-sm-12 text-center">
                <h6>Ngày tạo</h6>
              </div>
              <div className="col-md-12 col-lg-6 col-sm-12 text-center">
                <h6>Ngày cập nhật</h6>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-2 col-sm-12 text-center">
            <h6>Trạng thái</h6>
          </div>
          <div className="col-md-12 col-lg-2 col-sm-12 text-center">
            <h6>Hành động</h6>
          </div>
        </div>
        {res.data.map((item, index) => (
          <React.Fragment key={index}>
            <div key={item.id + " " + index} className="bg-white" style={{ margin: "15px 0px", borderRadius: "5px", boxShadow: "0px 5px 20px rgb(0 0 0 / 20%)" }}>
              <div className="row bg-orange2" style={{ margin: "0px", minHeight: "40px" }}>
                <div style={{ margin: "auto" }} className="col-md-12 col-lg-2 col-sm-12 text-center">
                  {item.code}
                </div>
                <div style={{ margin: "auto" }} className="col-md-12 col-lg-3 col-sm-12 text-center">
                  <div className="row">
                    <div style={{ margin: "auto" }} className="col-md-12 col-lg-7 col-sm-12 text-center">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.totalCost)}
                    </div>
                    <div style={{ margin: "auto" }} className="col-md-12 col-lg-5 col-sm-12 text-center">
                      {item.aclass ? "Offline" : "Online"}
                    </div>
                  </div>
                </div>
                <div style={{ margin: "auto" }} className="col-md-12 col-lg-3 col-sm-12 text-center">
                  <div className="row">
                    <div style={{ margin: "auto" }} className="col-md-12 col-lg-6 col-sm-12 text-center">
                      {dateFormat(item.created_date, "hh:MM:ss dd/mm/yyyy")}
                    </div>
                    <div style={{ margin: "auto" }} className="col-md-12 col-lg-6 col-sm-12 text-center">
                      {dateFormat(item.update_date, "hh:MM:ss dd/mm/yyyy")}
                    </div>
                  </div>
                </div>
                <div style={{ margin: "auto" }} className="col-md-12 col-lg-2 col-sm-12 text-center">
                  <span
                    className="badge badge-success"
                  >
                    Đã Thanh toán
                  </span>
                </div>
                <div style={{ margin: "auto" }} className="col-md-12 col-lg-2 col-sm-12 text-center">
                </div>
              </div>
              {item.orderPackages.map((x,) => {
                return (
                  <React.Fragment key={x.id + " " + index}>
                    {x._combo && (
                      <div className="row" key={x.id} style={{ margin: "0px" }}>
                        <div className="col-md-12 col-lg-6 col-sm-12 ">
                          <div className="media align-items-center font-weight-semibold align-middle p-2" style={{ cursor: "pointer", }} onClick={() => history.push(`/combo/${x._combo?.id}`)}>
                            <img
                              style={{ height: "50px", borderRadius: "5px", objectFit: "cover" }}
                              src={combieImg(x?._combo?.image)}
                              className="d-block ui-w-40 ui-bordered mr-4"
                              alt=""
                              width={100}
                              onError={({ currentTarget }) => {
                                currentTarget.src =
                                  "http://www.onlinecoursehow.com/wp-content/uploads/2019/05/4.jpg";
                              }}
                            />
                            <div className="media-body ">
                              {x?._combo?.title}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-2 col-sm-12 text-center font-weight-semibold align-middle p-2">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(x._combo.comboPackages.reduce(
                            (pre, x) => pre + x.salePrice,
                            0
                          ))}
                        </div>
                        <div className="col-md-12 col-lg-2 col-sm-12 text-center">
                          {x.activated === true || item.aclass ? (
                            <span
                              className="badge badge-success"
                            >
                              Đã kích hoạt
                            </span>
                          ) : (
                            <span
                              className="badge badge-warning"
                            >
                              Chưa kích hoạt
                            </span>
                          )}
                        </div>
                        <div className="col-md-12 col-lg-2 col-sm-12 text-center p-3">
                          {x.activated === false && !item.aclass ? (
                            <span
                              className="badge badge-success"
                              onClick={() => { history.push("/active-course"); }}
                              style={{cursor:"pointer"}}
                            >
                              Kích hoạt ngay
                            </span>
                          ) : (null)
                          }
                        </div>
                      </div>
                    )}
                    {x._package && (
                      <div className="row" key={x.id} style={{ margin: "0px" }}>
                        <div className="col-md-12 col-lg-6 col-sm-12">
                          <div className="media align-items-center font-weight-semibold align-middle p-2" style={{ cursor: "pointer", }} onClick={() => history.push(`/courses-details/${x._package?.id}`)}>
                            <img
                              style={{ height: "50px", borderRadius: "5px", objectFit: "cover" }}
                              src={combieImg(x._package.image)}
                              className="d-block ui-w-40 ui-bordered mr-4"
                              alt=""
                              width={100}
                              onError={({ currentTarget }) => {
                                currentTarget.src =
                                  "http://www.onlinecoursehow.com/wp-content/uploads/2019/05/4.jpg";
                              }}
                            />
                            <div className="media-body">
                              {x._package.title}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-2 col-sm-12 text-center font-weight-semibold align-middle p-2">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(x?._package?.salePrice)}
                        </div>
                        <div className="col-md-12 col-lg-2 col-sm-12 text-center p-3">
                          {x.activated === true || item.aclass ? (
                            <span
                              className="badge badge-success"
                            >
                              Đã kích hoạt
                            </span>
                          ) : (
                            <span
                              className="badge badge-warning"
                            >
                              Chưa kích hoạt
                            </span>
                          )}
                        </div>
                        <div className="col-md-12 col-lg-2 col-sm-12 text-center p-3">
                          {x.activated === false && !item.aclass ? (
                            <span
                              className="badge badge-success"
                              onClick={() => { history.push("/active-course"); }}
                              style={{cursor:"pointer"}}
                            >
                              Kích hoạt ngay
                            </span>
                          ) : (null)
                          }
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </React.Fragment>
        ))}
        <div className="d-flex  justify-content-between align-items-center m-2">
          <Paging
            totalPage={res.totalPages}
            pageIndex={pageIndex}
            onChange={(e) => {
              setPageIndex(e);
            }}
          ></Paging>
        </div>
      </div>
    </>
  );
}

export default MyOrderProfile;
