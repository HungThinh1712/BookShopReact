import React from 'react';
import SideBarAdminPage from '../../common/SideBarAdminPage'

const Book = () => {
    return (
        <div>
            <div id="wrapper">

                
                <SideBarAdminPage></SideBarAdminPage>
                <div id="content-wrapper">

                    <div className="container-fluid">

                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="#">Dashboard</a>
                            </li>
                            <li className="breadcrumb-item active">Quản lý sách</li>
                        </ol>

                        <div className="card mb-3">
                            <div className="card-header">
                                <i className="fas fa-book"></i>
        Quản lý sách (Phần này t không biết làm sao kết nối datatable với csdl nên để tạm data tự viết cho có cái để nhìn nha (nghiên cứu sau :))))</div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Tên sách</th>
                                                <th>Loại sách</th>
                                                <th>Tác giả</th>
                                                <th>NXB</th>
                                                <th>SL</th>
                                                <th>Giá(VNĐ)</th>
                                            </tr>
                                        </thead>
                                        <tfoot>
                                            <tr>
                                                <th>STT</th>
                                                <th>Tên sách</th>
                                                <th>Loại sách</th>
                                                <th>Tác giả</th>
                                                <th>NXB</th>
                                                <th>SL</th>
                                                <th>Giá(VNĐ)</th>
                                            </tr>
                                        </tfoot>
                                        <tbody>
                                            <tr>
                                                <td>01</td>
                                                <td>Hành trình về Phương Đông</td>
                                                <td>Đời sống</td>
                                                <td>Ông nước ngoài</td>
                                                <td>Thanh niên</td>
                                                <td>20</td>
                                                <td>100.000</td>
                                            </tr>
                                            <tr>
                                                <td>02</td>
                                                <td>Cuộc hẹn bình minh</td>
                                                <td>Xã hội</td>
                                                <td>Ông nước ngoài</td>
                                                <td>Thanh niên</td>
                                                <td>25</td>
                                                <td>80.000</td>
                                            </tr>
                                            <tr>
                                                <td>03</td>
                                                <td>Giáo dục thể chất - 12</td>
                                                <td>Sách giáo khoa</td>
                                                <td>Nguyễn Văn A</td>
                                                <td>Giáo dục</td>
                                                <td>20</td>
                                                <td>100.000</td>
                                            </tr>
                                            <tr>
                                                <td>04</td>
                                                <td>Thám tử lừng danh Conan - 94</td>
                                                <td>Thiếu nhi- Trinh thám</td>
                                                <td>Ông nước ngoài</td>
                                                <td>Kim Đồng</td>
                                                <td>50</td>
                                                <td>75.000</td>
                                            </tr>
                                            <tr>
                                                <td>05</td>
                                                <td>Bá tước Monte Cristo</td>
                                                <td>Tiểu thuyết</td>
                                                <td>Ông nước ngoài</td>
                                                <td>Tuổi tẻ</td>
                                                <td>10</td>
                                                <td>250.000</td>
                                            </tr>
                                            <tr>
                                                <td>06</td>
                                                <td>Khởi nghiệp 4.0</td>
                                                <td>Kinh tế</td>
                                                <td>Trần Văn B</td>
                                                <td>Đại học quốc gia</td>
                                                <td>22</td>
                                                <td>120</td>
                                            </tr>
                                            <tr>
                                                <td>07</td>
                                                <td>The Alchemist</td>
                                                <td>Nước ngoài</td>
                                                <td>Ông nước ngoài</td>
                                                <td>NXB nước ngoài</td>
                                                <td>15</td>
                                                <td>145.000</td>
                                            </tr>
                                            <tr>
                                                <td>08</td>
                                                <td>Trên đường băng</td>
                                                <td>Truyện ngắn</td>
                                                <td>Ông nước ngoài</td>
                                                <td>Thanh niên</td>
                                                <td>19</td>
                                                <td>198.000</td>
                                            </tr>
                                            <tr>
                                                <td>01</td>
                                                <td>Hành trình về Phương Đông</td>
                                                <td>Đời sống</td>
                                                <td>Ông nước ngoài</td>
                                                <td>Thanh niên</td>
                                                <td>20</td>
                                                <td>100.000</td>
                                            </tr>
                                            <tr>
                                                <td>02</td>
                                                <td>Cuộc hẹn bình minh</td>
                                                <td>Xã hội</td>
                                                <td>Ông nước ngoài</td>
                                                <td>Thanh niên</td>
                                                <td>25</td>
                                                <td>80.000</td>
                                            </tr>
                                            <tr>
                                                <td>03</td>
                                                <td>Giáo dục thể chất - 12</td>
                                                <td>Sách giáo khoa</td>
                                                <td>Nguyễn Văn A</td>
                                                <td>Giáo dục</td>
                                                <td>20</td>
                                                <td>100.000</td>
                                            </tr>
                                            <tr>
                                                <td>04</td>
                                                <td>Thám tử lừng danh Conan - 94</td>
                                                <td>Thiếu nhi- Trinh thám</td>
                                                <td>Ông nước ngoài</td>
                                                <td>Kim Đồng</td>
                                                <td>50</td>
                                                <td>75.000</td>
                                            </tr>
                                            <tr>
                                                <td>05</td>
                                                <td>Bá tước Monte Cristo</td>
                                                <td>Tiểu thuyết</td>
                                                <td>Ông nước ngoài</td>
                                                <td>Tuổi tẻ</td>
                                                <td>10</td>
                                                <td>250.000</td>
                                            </tr>
                                            <tr>
                                                <td>06</td>
                                                <td>Khởi nghiệp 4.0</td>
                                                <td>Kinh tế</td>
                                                <td>Trần Văn B</td>
                                                <td>ĐH quốc gia</td>
                                                <td>22</td>
                                                <td>120</td>
                                            </tr>
                                            <tr>
                                                <td>07</td>
                                                <td>The Alchemist</td>
                                                <td>Nước ngoài</td>
                                                <td>Ông nước ngoài</td>
                                                <td>NXB nước ngoài</td>
                                                <td>15</td>
                                                <td>145.000</td>
                                            </tr>
                                            <tr>
                                                <td>08</td>
                                                <td>Trên đường băng</td>
                                                <td>Truyện ngắn</td>
                                                <td>Ông nước ngoài</td>
                                                <td>Thanh niên</td>
                                                <td>19</td>
                                                <td>198.000</td>
                                            </tr>
                                            <tr>
                                                <td>01</td>
                                                <td>Hành trình về Phương Đông</td>
                                                <td>Đời sống</td>
                                                <td>Ông nước ngoài</td>
                                                <td>Thanh niên</td>
                                                <td>20</td>
                                                <td>100.000</td>
                                            </tr>
                                            <tr>
                                                <td>02</td>
                                                <td>Cuộc hẹn bình minh</td>
                                                <td>Xã hội</td>
                                                <td>Ông nước ngoài</td>
                                                <td>Thanh niên</td>
                                                <td>25</td>
                                                <td>80.000</td>
                                            </tr>
                                            <tr>
                                                <td>03</td>
                                                <td>Giáo dục thể chất - 12</td>
                                                <td>Sách giáo khoa</td>
                                                <td>Nguyễn Văn A</td>
                                                <td>Giáo dục</td>
                                                <td>20</td>
                                                <td>100.000</td>
                                            </tr>
                                            <tr>
                                                <td>04</td>
                                                <td>Thám tử lừng danh Conan - 94</td>
                                                <td>Thiếu nhi- Trinh thám</td>
                                                <td>Ông nước ngoài</td>
                                                <td>Kim Đồng</td>
                                                <td>50</td>
                                                <td>75.000</td>
                                            </tr>
                                            <tr>
                                                <td>05</td>
                                                <td>Bá tước Monte Cristo</td>
                                                <td>Tiểu thuyết</td>
                                                <td>Ông nước ngoài</td>
                                                <td>Tuổi tẻ</td>
                                                <td>10</td>
                                                <td>250.000</td>
                                            </tr>
                                            <tr>
                                                <td>06</td>
                                                <td>Khởi nghiệp 4.0</td>
                                                <td>Kinh tế</td>
                                                <td>Trần Văn B</td>
                                                <td>Đại học quốc gia</td>
                                                <td>22</td>
                                                <td>120</td>
                                            </tr>
                                            <tr>
                                                <td>07</td>
                                                <td>The Alchemist</td>
                                                <td>Nước ngoài</td>
                                                <td>Ông nước ngoài</td>
                                                <td>NXB nước ngoài</td>
                                                <td>15</td>
                                                <td>145.000</td>
                                            </tr>
                                            <tr>
                                                <td>08</td>
                                                <td>Trên đường băng</td>
                                                <td>Truyện ngắn</td>
                                                <td>Ông nước ngoài</td>
                                                <td>Thanh niên</td>
                                                <td>19</td>
                                                <td>198.000</td>
                                            </tr>
                                            <tr>
                                                <td>01</td>
                                                <td>Hành trình về Phương Đông</td>
                                                <td>Đời sống</td>
                                                <td>Ông nước ngoài</td>
                                                <td>Thanh niên</td>
                                                <td>20</td>
                                                <td>100.000</td>
                                            </tr>
                                            <tr>
                                                <td>02</td>
                                                <td>Cuộc hẹn bình minh</td>
                                                <td>Xã hội</td>
                                                <td>Ông nước ngoài</td>
                                                <td>Thanh niên</td>
                                                <td>25</td>
                                                <td>80.000</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default Book;