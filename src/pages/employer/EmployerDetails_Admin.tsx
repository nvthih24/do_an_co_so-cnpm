import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import {
  ArrowLeft, Edit, Trash2, Mail, MapPin, Calendar, Globe, Building2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Model';
import Tabs from '../../components/ui/Tab';
import { formatDate } from '../../utils/helpers';
import Header from '../../components/layout/Header_Admin';
import Sidebar from '../../components/layout/Sidebar';
import { useTheme } from '../../contexts/ThemeContext';
import axios from 'axios';

const EmployerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('company');
  const [employer, setEmployer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { theme } = useTheme();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // goi api lay du lieu employer
  useEffect(() => {
    const fetchEmployer = async () => {
      try {
        setLoading(true);
        console.log('Fetching employer data for ID:', id);
        const res = await axios.get(`/api/employers/${id}`);
        console.log('Employer data:', res.data);
        setEmployer(res.data);
        setLoading(false);
      } catch (err) {
        setError('Không thể tải dữ liệu nhà tuyển dụng.');
        setLoading(false);
      }
    };
    fetchEmployer();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Đang tải...</h2>
      </div>
    );
  }

  if (error || !employer) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Không tìm thấy nhà tuyển dụng</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Nhà tuyển dụng bạn đang tìm không tồn tại.</p>
        <Button onClick={() => navigate('/employer-admin')}>Quay lại danh sách</Button>
      </div>
    );
  }

  const tabs = [
    { id: 'company', label: 'Thông tin công ty' },
    { id: 'activity', label: 'Hoạt động' }
  ];

  const handleEdit = () => {
    console.log('Chỉnh sửa nhà tuyển dụng:', employer.id);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/employers/${id}`);
      setIsDeleteModalOpen(false);
      navigate('/employer-admin');
    } catch (err) {
      console.error('Lỗi khi xóa:', err);
    }
  };

  return (
    <div className={`flex h-screen bg-gray-50 ${theme === 'dark' ? 'dark' : ''}`}>
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      <div className="flex-1 flex flex-col overflow-hidden transition-all duration-300 dark:bg-gray-900">
        <Header sidebarCollapsed={sidebarCollapsed} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="mr-4"
                  onClick={() => navigate('/employer-admin')}
                  icon={<ArrowLeft size={18} />}
                >
                  Quay lại
                </Button>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Chi tiết nhà tuyển dụng</h1>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  icon={<Edit size={16} />}
                  onClick={handleEdit}
                >
                  Chỉnh sửa
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  icon={<Trash2 size={16} />}
                  onClick={() => setIsDeleteModalOpen(true)}
                >
                  Xóa
                </Button>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <img
                        className="h-24 w-24 rounded-full object-cover border-4 border-white shadow dark:border-gray-800"
                        src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=240"
                        alt={employer.companyName}
                      />
                      <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">{employer.companyName}</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{employer.industry}</p>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <Building2 size={18} className="text-gray-400 mr-3" />
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Quy mô công ty</p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{employer.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <MapPin size={18} className="text-gray-400 mr-3" />
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Địa điểm</p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{employer.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Calendar size={18} className="text-gray-400 mr-3" />

                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Thông tin liên hệ</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Mail size={18} className="text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{employer.email}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Người liên hệ</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{employer.name}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                <Tabs
                  tabs={tabs}
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                />

                {activeTab === 'company' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Tổng quan công ty</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Tóm tắt công ty</h3>
                          <p className="text-gray-900 dark:text-white">
                            {employer.companyName} là một công ty trong ngành {employer.industry}, đặt tại {employer.location}.
                            {employer.description && <span> {employer.description}</span>}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {activeTab === 'activity' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Hoạt động tài khoản</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="relative">
                        <div className="absolute top-0 bottom-0 left-5 border-l-2 border-gray-200 dark:border-gray-700"></div>
                        <ul className="space-y-6">
                          <li className="relative pl-12">
                            <span className="absolute left-4 -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white dark:border-gray-800"></span>
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">Tài khoản được đăng ký</p>
                              <time className="text-xs text-gray-500 dark:text-gray-400">{formatDate(employer.createdAt)}</time>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Delete Confirmation Modal */}
            <Modal
              isOpen={isDeleteModalOpen}
              onClose={() => setIsDeleteModalOpen(false)}
              title="Xóa nhà tuyển dụng"
              footer={
                <div className="flex justify-end space-x-3">
                  <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                    Hủy
                  </Button>
                  <Button variant="danger" onClick={handleDelete}>
                    Xóa
                  </Button>
                </div>
              }
            >
              <div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Bạn có chắc chắn muốn xóa nhà tuyển dụng này? Hành động này không thể hoàn tác.
                </p>
                <div className="bg-red-50 border-l-4 border-red-500 p-4 dark:bg-red-900/20 dark:border-red-700">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=100"
                        alt={employer.companyName}
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-red-800 dark:text-red-400">{employer.companyName}</p>
                      <p className="text-sm text-red-700 dark:text-red-300">{employer.name} • {employer.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default EmployerDetails;