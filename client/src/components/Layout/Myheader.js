const Myheader = () => {
    const [auth, setAuth] = useAuth();
    const categories = useCategory();
    const [cart, setCart] = useCart();

    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: ""
        });
        localStorage.removeItem("auth");
        toast.success("تم تسجيل الخروج بنجاح");
    };

    const styles = {
        navbar: {
            backgroundColor: '#f8f9fa',
            borderBottom: '1px solid #e0e0e0',
            padding: '10px 20px',
            fontFamily: 'Tajawal, sans-serif',
        },
        brand: {
            color: '#8B4513', // Wood color
            fontSize: '30px', // Larger font size
            fontWeight: 'bold',
            letterSpacing: '1px',
        },
        navLink: {
            color: '#333',
            margin: '0 10px',
            fontSize: '16px',
        },
        dropdownToggle: {
            cursor: 'pointer',
        },
        badge: {
            cursor: 'pointer',
        }
    };

    return (
        <nav className="navbar navbar-expand-lg" style={styles.navbar}>
            <div className="container-fluid">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarTogglerDemo01"
                    aria-controls="navbarTogglerDemo01"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <Link to="/" className="navbar-brand" style={styles.brand}>الزغبي للاثاث</Link>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <SearchInput />
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link" style={styles.navLink}>الرئيسية</NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" style={styles.dropdownToggle} data-bs-toggle="dropdown">
                                الفئات
                            </Link>
                            <ul className="dropdown-menu">
                                {categories?.map(c => (
                                    <li key={c._id}><Link to={`/category/${c._id}`} className="dropdown-item">{c.name}</Link></li>
                                ))}
                            </ul>
                        </li>
                        {!auth.user ? (
                            <>
                                <li className="nav-item">
                                    <NavLink to="/register" className="nav-link" style={styles.navLink}>انشاء حساب</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/login" className="nav-link" style={styles.navLink}>تسجيل الدخول</NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item dropdown">
                                    <NavLink className="nav-link dropdown-toggle" style={styles.dropdownToggle} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {auth?.user?.name}
                                    </NavLink>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="dropdown-item">
                                                لوحة التحكم
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/login" onClick={handleLogout} className="dropdown-item">
                                                تسجيل الخروج
                                            </NavLink>
                                        </li>
                                    </ul>
                                </li>
                            </>
                        )}
                        <li className="nav-item">
                            <Badge count={cart?.length} showZero style={styles.badge}>
                                <NavLink to="/cart" className="nav-link" style={styles.navLink}><GiShoppingBag /> عربة الشراء</NavLink>
                            </Badge>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Myheader;
