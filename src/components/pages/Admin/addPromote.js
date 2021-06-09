import React, { useEffect, useState} from 'react'
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import { Button } from "antd";
import { Input, InputNumber, message } from "antd";
import { Select } from "antd";
import { DatePicker } from "antd";
import { Radio } from 'antd';
import SideBarAdminPage from "../../common/SideBarAdminPage";
import Header from "../../common/Header";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { red } from '@material-ui/core/colors';

function AddPromotion() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  useEffect(() => {
    console.log(editorState);
  }, [editorState]);

  return (
    <div id="wrapper">
        <Header notShow="notShow" />
        <SideBarAdminPage />
        <div id="content-wrapper" style={{ marginTop: "100px", marginLeft: "250px" }}>
        <div><h4>THÊM KHUYẾN MÃI</h4></div>
          <div className="container-fluid" style={{ border: "1px solid #ccccb3" }}>
            <div className="card-body">
              <div className="tm-bg-primary-dark tm-block tm-block-h-auto">
              <div className="form-group mb-3">
              <h6>Thông tin chung</h6>
            </div>
                <div className="row tm-edit-product-row">
                  <div className="col-xl-10 col-lg-10 col-md-12">
                    <div className="row">
                      <div className="form-group mb-3 col-xs-12 col-sm-4">
                      <label><span style={{ color: 'red', fontSize: '5px', marginRight:'5px', marginTop:'-5px'}}><i className="fas fa-star-of-life"></i></span>Mã khuyến mãi</label>
                      <Input />
                      </div>
                      <div className="form-group mb-3 col-xs-12 col-sm-4">
                        <label><span style={{ color: 'red', fontSize: '5px', marginRight:'5px', marginTop:'-5px'}}><i className="fas fa-star-of-life"></i></span>Tên khuyến mãi</label>
                        <Input />
                      </div>
                      <div className="form-group mb-3 col-xs-12 col-sm-4">
                        <label><span style={{ color: 'red', fontSize: '5px', marginRight:'5px', marginTop:'-5px'}}><i className="fas fa-star-of-life"></i></span>Đối tượng áp dụng</label>
                        <Input />
                      </div>
                    </div>

                    <div className="row">
                      <div className="form-group mb-3 col-xs-12 col-sm-4">
                      <label><span style={{ color: 'red', fontSize: '5px', marginRight:'5px', marginTop:'-5px'}}><i className="fas fa-star-of-life"></i></span>Ngày bắt đầu</label>
                        <DatePicker style={{ width: "100%" }} />
                      </div>
                      <div className="form-group mb-3 col-xs-12 col-sm-4">
                      <label><span style={{ color: 'red', fontSize: '5px', marginRight:'5px', marginTop:'-5px'}}><i className="fas fa-star-of-life"></i></span>Ngày kết thúc</label>
                        <DatePicker style={{ width: "100%" }}/>
                      </div>
                      <div className="form-group mb-3 col-xs-12 col-sm-4">
                        <label><span style={{ color: 'red', fontSize: '5px', marginRight:'5px', marginTop:'-5px'}}><i className="fas fa-star-of-life"></i></span>Số lần áp dụng</label>
                        <Select style={{ width: "100%" }}/>
                      </div>
                    </div>

                    <div className="row">
                      <div className="form-group mb-3 col-xs-12 col-sm-12">
                      <label><span style={{ color: 'red', fontSize: '5px', marginRight:'5px', marginTop:'-5px'}}><i className="fas fa-star-of-life"></i></span>Mô tả</label>
                      <div style={{ border: "1px solid black", padding: '2px', minHeight: '100px' }}>
                        <Editor
                          editorState={editorState}
                          onEditorStateChange={setEditorState}
                        />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid" style={{ border: "1px solid #ccccb3", marginTop: "10px" }}>
            <div className="card-body">
              <div className="tm-bg-primary-dark tm-block tm-block-h-auto">
              <div className="form-group mb-3">
                <h6>Chương trình khuyến mãi</h6>
              </div>
                <div className="row tm-edit-product-row">
                  <div className="col-xl-10 col-lg-10 col-md-12">
                  <Radio.Group name="radiogroup" defaultValue={1}>
                    <Radio value={1} checked={true}>Giảm số tiền</Radio>
                    <Radio value={2}>Miến phí giao hàng</Radio>
                  </Radio.Group>
                  <div className="form-group mb-3" style={{marginTop: "20px"}}>
                    <h6>Điều kiện áp dụng</h6>
                  </div>
                  <div className="row">
                    <div className="form-group mb-3 col-xs-12 col-sm-4">
                    <label><span style={{ color: 'red', fontSize: '5px', marginRight:'5px', marginTop:'-5px'}}><i className="fas fa-star-of-life"></i></span>Tổng tiền đơn hàng tối thiểu</label>
                      <Input placeholder="Nhập số tiền"/>
                    </div>
                    <div className="form-group mb-3 col-xs-12 col-sm-4">
                    <label><span style={{ color: 'red', fontSize: '5px', marginRight:'5px', marginTop:'-5px'}}><i className="fas fa-star-of-life"></i></span>Số tiền được giảm</label>
                      <Input placeholder="Nhập số tiền"/>
                    </div>
                  </div>
                  <div className="form-group mb-3" style={{marginTop: "20px"}}>
                    <h6>Danh sách sản phẩm</h6>
                  </div>
                  <div className="row">
                    <div className="form-group mb-3 col-xs-12 col-sm-12">
                      <label><span style={{ color: 'red', fontSize: '5px', marginRight:'5px', marginTop:'-5px'}}><i className="fas fa-star-of-life"></i></span>Sản phẩm mua</label>
                      <div style={{ padding: '2px'}}>
                      <Radio.Group name="radiogroup" defaultValue={1}>
                        <Radio value={1} checked={true}>Tất cả</Radio>
                        <Radio value={2}>Tìm theo danh mục</Radio>
                        <Radio value={3}>Tìm theo sản phẩm</Radio>
                      </Radio.Group>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group mb-3 col-xs-12 col-sm-3">
                      <label>Mua</label>
                      <Input placeholder="Nhập số món"/>
                    </div>
                    <div className="form-group mb-3 col-xs-12 col-sm-3">
                      <label>Sản phẩm</label>
                      <Select style={{ width: "100%" }}/>
                    </div>
                    <div className="form-group mb-3 col-xs-12 col-sm-3">
                      <label>Kích cỡ</label>
                      <Select style={{ width: "100%" }}/>
                    </div>
                  </div>

                  <div className="row">
                    <Button type="primary" style={{ width: "15%", marginLeft: "15px" }} >
                      <i className="fas fa-plus"></i>Thêm mới
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPromotion;