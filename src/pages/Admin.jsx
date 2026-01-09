import { useState, useEffect } from 'react';
import { dataService } from '../services/dataService';
import { FiLogOut, FiPhone, FiTruck, FiCheckCircle, FiTrash2, FiClock } from 'react-icons/fi';

export default function Admin() {
    const [orders, setOrders] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // Simple password protection
    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'admin123') { // Simple password for now
            setIsLoggedIn(true);
            setError('');
        } else {
            setError('كلمة المرور خاطئة');
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            loadOrders();
        }
    }, [isLoggedIn]);

    const loadOrders = async () => {
        setLoading(true);
        try {
            const data = await dataService.getOrders();
            setOrders(data);
        } catch (err) {
            console.error("Failed to load orders:", err);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        setLoading(true);
        await dataService.updateOrderStatus(id, status);
        await loadOrders();
    };

    const deleteOrder = async (id) => {
        if (window.confirm('هل أنت متأكد من حذف هذا الطلب؟')) {
            setLoading(true);
            await dataService.deleteOrder(id);
            await loadOrders();
        }
    };

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString('ar-DZ') + ' ' + date.toLocaleTimeString('ar-DZ');
    };

    if (!isLoggedIn) {
        return (
            <div className="admin-login">
                <div className="admin-login__card">
                    <img src="/logo.png" alt="Logo" className="admin-login__logo" />
                    <h2>لوحة التحكم</h2>
                    <form onSubmit={handleLogin}>
                        <input
                            type="password"
                            placeholder="كلمة المرور"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && <p className="admin-login__error">{error}</p>}
                        <button type="submit">دخول</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <header className="admin-header">
                <div className="admin-header__brand">
                    <img src="/logo.png" alt="Logo" className="admin-header__logo" />
                    <h1>لوحة إدارة الطلبات</h1>
                </div>
                <button className="admin-header__logout" onClick={() => setIsLoggedIn(false)}>
                    <FiLogOut /> خروج
                </button>
            </header>

            <main className="admin-main">
                <div className="admin-stats">
                    <div className="stat-card">
                        <span className="stat-card__label">إجمالي الطلبات</span>
                        <span className="stat-card__value">{orders.length}</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-card__label">طلبات جديدة</span>
                        <span className="stat-card__value">{orders.filter(o => o.status === 'جديد').length}</span>
                    </div>
                </div>

                <div className="orders-table-container">
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>التاريخ</th>
                                <th>الزبون</th>
                                <th>رقم الهاتف</th>
                                <th>الولاية/البلدية</th>
                                <th>المنتج/التفاصيل</th>
                                <th>السعر</th>
                                <th>الحالة</th>
                                <th>إجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan="8" style={{ textAlign: 'center', padding: '40px' }}>لا توجد طلبات بعد</td>
                                </tr>
                            ) : (
                                orders.map((order) => (
                                    <tr key={order.id} className={`status-${order.status}`}>
                                        <td>{formatDate(order.date)}</td>
                                        <td>{order.name}</td>
                                        <td style={{ direction: 'ltr' }}>{order.phone}</td>
                                        <td>{order.wilaya} / {order.commune}</td>
                                        <td>
                                            <div><strong>{order.productName}</strong></div>
                                            <div className="order-details">
                                                {order.size} | {order.color} | {order.quantity}
                                            </div>
                                        </td>
                                        <td className="order-price">{order.totalPrice}</td>
                                        <td>
                                            <span className={`status-badge ${order.status === 'جديد' ? 'new' : order.status === 'تم التأكيد' ? 'confirmed' : 'delivered'}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="order-actions">
                                            <div className="action-buttons">
                                                <button title="اتصال" onClick={() => window.open(`tel:${order.phone}`)}>
                                                    <FiPhone />
                                                </button>
                                                <button
                                                    className="btn-confirm"
                                                    title="تأكيد"
                                                    onClick={() => updateStatus(order.id, 'تم التأكيد')}
                                                >
                                                    <FiCheckCircle />
                                                </button>
                                                <button
                                                    className="btn-deliver"
                                                    title="تم التوصيل"
                                                    onClick={() => updateStatus(order.id, 'تم التوصيل')}
                                                >
                                                    <FiTruck />
                                                </button>
                                                <button
                                                    className="btn-delete"
                                                    title="حذف"
                                                    onClick={() => deleteOrder(order.id)}
                                                >
                                                    <FiTrash2 />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
