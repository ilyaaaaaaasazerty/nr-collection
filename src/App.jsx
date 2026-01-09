import { useState, useEffect } from 'react'
import { FaWhatsapp, FaStar, FaFacebookF, FaInstagram, FaShoppingCart } from 'react-icons/fa'
import { FiMenu, FiPhone } from 'react-icons/fi'
import 'swiper/css'

function App() {
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [currentImage, setCurrentImage] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    wilaya: '',
    commune: '',
  })
  const [errors, setErrors] = useState({})

  // المنتجات - يمكنك تعديلها
  const products = [
    {
      id: 1,
      name: 'طقم أطفال فاخر',
      subtitle: 'ملابس أطفال أنيقة - جودة عالية',
      price: 5900,
      oldPrice: 6900,
      discount: 22,
      images: [
        '/products/product1.png',
        '/products/product2.png',
        '/products/product3.png',
        '/products/product4.png',
        '/products/product5.png',
        '/products/product6.png',
        '/products/product7.png',
        '/products/product8.png',
      ],
      sizes: ['4 سنوات', '6 سنوات', '8 سنوات', '10 سنوات', '12 سنة'],
      colors: [
        { name: 'أسود', hex: '#1a1a1a' },
        { name: 'بني داكن', hex: '#5f3f29' },
        { name: 'كاكي', hex: '#876746' },
        { name: 'بيج', hex: '#d2ba9f' },
        { name: 'رمادي', hex: '#676669' },
        { name: 'بني فاتح', hex: '#886946' },
        { name: 'زيتي', hex: '#313323' },
      ],
      features: [
        'قماش عالي الجودة مريح للأطفال',
        'تصميم أنيق يناسب جميع المناسبات',
        'سهل الغسل والكي',
        'ألوان ثابتة لا تبهت مع الغسل',
      ],
    },
  ]

  const product = products[0]

  // خيارات الكمية والأسعار
  const quantityOptions = [
    { qty: 1, label: 'قطعة واحدة', price: product.price },
    { qty: 2, label: 'قطعتين', price: product.price * 2 - 500 },
    { qty: 3, label: 'ثلاث قطع', price: product.price * 3 - 1200 },
  ]

  // الولايات الجزائرية
  const wilayas = [
    'أدرار', 'الشلف', 'الأغواط', 'أم البواقي', 'باتنة', 'بجاية', 'بسكرة', 'بشار',
    'البليدة', 'البويرة', 'تمنراست', 'تبسة', 'تلمسان', 'تيارت', 'تيزي وزو', 'الجزائر',
    'الجلفة', 'جيجل', 'سطيف', 'سعيدة', 'سكيكدة', 'سيدي بلعباس', 'عنابة', 'قالمة',
    'قسنطينة', 'المدية', 'مستغانم', 'المسيلة', 'معسكر', 'ورقلة', 'وهران', 'البيض',
    'إليزي', 'برج بوعريريج', 'بومرداس', 'الطارف', 'تندوف', 'تيسمسيلت', 'الوادي',
    'خنشلة', 'سوق أهراس', 'تيبازة', 'ميلة', 'عين الدفلى', 'النعامة', 'عين تموشنت',
    'غرداية', 'غليزان'
  ]

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ar-DZ').format(price) + 'دج'
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'مطلوب'
    if (!formData.phone.trim()) newErrors.phone = 'مطلوب'
    if (!formData.wilaya) newErrors.wilaya = 'اختر الولاية'
    if (!selectedSize) newErrors.size = 'اختر المقاس'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const generateWhatsAppMessage = () => {
    const selectedQty = quantityOptions.find(q => q.qty === selectedQuantity)
    const message = `🛍️ *طلب جديد - NR Collection*

👤 *الاسم:* ${formData.name}
📱 *الهاتف:* ${formData.phone}
📍 *الولاية:* ${formData.wilaya}
🏠 *البلدية:* ${formData.commune || '-'}

📦 *تفاصيل الطلب:*
• المنتج: ${product.name}
• المقاس: ${selectedSize}
• اللون: ${selectedColor || 'غير محدد'}
• الكمية: ${selectedQty?.label}
• السعر: ${formatPrice(selectedQty?.price || product.price)}

💳 *الدفع عند الاستلام*`

    return encodeURIComponent(message)
  }

  const handleSubmit = (e) => {
    e?.preventDefault()
    if (!validateForm()) return

    const phoneNumber = '213656081893'
    const message = generateWhatsAppMessage()
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
    setShowSuccess(true)
  }

  const scrollToForm = () => {
    document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="app">
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <span>🚀 عروض حصرية! الدفع عند الاستلام - اطلب الآن!</span>
      </div>

      {/* Header */}
      <header className="header">
        <FaShoppingCart className="header__cart" size={20} />
        <img src="/logo.png" alt="NR Collection" className="header__logo" />
        <FiMenu size={24} className="header__menu" />
      </header>

      <main>
        {/* Product Section */}
        <section className="product-section">
          <div className="product-header">
            <span className="product-badge">منتوج حصري ⭐</span>
            <h1 className="product-title">{product.name}</h1>
            <p className="product-subtitle">{product.subtitle}</p>

            <div className="price-container">
              <span className="price-current">{formatPrice(product.price)}</span>
              <span className="price-old">{formatPrice(product.oldPrice)}</span>
              <span className="discount-badge">-{product.discount}%</span>
            </div>

            <div className="star-rating">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
          </div>

          {/* Image Gallery */}
          <div className="image-gallery">
            <img
              src={product.images[currentImage]}
              alt={product.name}
              className="image-main"
            />
            <div className="image-thumbnails">
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${product.name} ${i + 1}`}
                  className={`image-thumbnail ${currentImage === i ? 'active' : ''}`}
                  onClick={() => setCurrentImage(i)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Order Form Section */}
        <section id="order-form" className="order-section">
          <h2 className="order-section__title">📝 أكمل طلبك</h2>

          {/* Customer Info Form */}
          <div className="form-grid">
            <div className="form-group">
              <label>الاسم الكامل</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="أدخل اسمك"
              />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label>رقم الهاتف 📱</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="07XXXXXXXX"
                style={{ direction: 'ltr', textAlign: 'left' }}
              />
              {errors.phone && <span className="form-error">{errors.phone}</span>}
            </div>
            <div className="form-group">
              <label>الولاية</label>
              <select name="wilaya" value={formData.wilaya} onChange={handleChange}>
                <option value="">اختر الولاية</option>
                {wilayas.map((w, i) => (
                  <option key={i} value={w}>{w}</option>
                ))}
              </select>
              {errors.wilaya && <span className="form-error">{errors.wilaya}</span>}
            </div>
            <div className="form-group">
              <label>البلدية</label>
              <input
                type="text"
                name="commune"
                value={formData.commune}
                onChange={handleChange}
                placeholder="البلدية"
              />
            </div>
          </div>

          {/* Quantity/Price Options */}
          <div className="delivery-section">
            <h3 className="delivery-title">📦 سعر التوصيل</h3>
            <div className="quantity-options">
              {quantityOptions.map((opt) => (
                <div
                  key={opt.qty}
                  className={`quantity-option ${selectedQuantity === opt.qty ? 'selected' : ''}`}
                  onClick={() => setSelectedQuantity(opt.qty)}
                >
                  <div className="quantity-option__radio" />
                  <div className="quantity-option__info">
                    <span className="quantity-option__label">{opt.label}</span>
                  </div>
                  <span className="quantity-option__price">{formatPrice(opt.price)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="size-section">
            <h3 className="size-title">اختر المقاس</h3>
            <div className="size-options">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            {errors.size && <span className="form-error" style={{ marginTop: '8px' }}>{errors.size}</span>}
          </div>

          {/* Color Selector */}
          <div className="color-section">
            <h3 className="color-title">اختر اللون</h3>
            <div className="color-options">
              {product.colors.map((color) => (
                <div
                  key={color.name}
                  className={`color-option ${selectedColor === color.name ? 'selected' : ''}`}
                  onClick={() => setSelectedColor(color.name)}
                >
                  <div
                    className="color-option__swatch"
                    style={{ backgroundColor: color.hex, border: color.hex === '#ffffff' ? '2px solid #e5e7eb' : 'none' }}
                  />
                  <span className="color-option__label">{color.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Order Button */}
          <button className="order-btn" onClick={handleSubmit}>
            اشتري الآن 🛒
          </button>

          {/* Order Summary Link */}
          <div className="order-summary-link">
            🛍️ ملخص الطلبية
          </div>
        </section>

        {/* Product Description */}
        <section className="description-section">
          <h2 className="description-title">📖 وصف المنتج</h2>
          <p className="description-text">
            اكتشف {product.name} واستمتع براحة و أناقة لا مثيل لها.
            مصنوع من أجود أنواع الأقمشة لضمان راحة طفلك طوال اليوم.
          </p>

          <div className="description-features">
            {product.features.map((feature, i) => (
              <div key={i} className="description-feature">
                {feature}
              </div>
            ))}
          </div>

          <img
            src="/products/product8.png"
            alt="طقم أطفال"
            className="description-image"
          />

          <h3 className="description-title" style={{ marginTop: '24px' }}>🚚 طريقة التوصيل و الدفع</h3>
          <p className="description-text">
            بعد ملأ جميع المعلومات الخاصة سيقوم فريقنا بالإتصال بك لتأكيد
            الطلبية و بعد ذالك يتم إرسالها إلى عنوانكم المحدد خلال مدة 24 إلى
            48 ساعة. الدفع يكون عند الاستلام.
          </p>
        </section>

        {/* Footer */}
        <footer className="footer">
          <img src="/logo.png" alt="NR Collection" className="footer__logo" />
          <p className="footer__text">حقوق محفوظة لـ NR Collection</p>
          <div className="footer__social">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="https://wa.me/213561761020"><FaWhatsapp /></a>
          </div>
        </footer>
      </main>

      {/* Fixed Bottom Bar */}
      <div className="fixed-bottom-bar">
        <a href="https://wa.me/213561761020" className="whatsapp-btn">
          <FaWhatsapp />
        </a>
        <button className="fixed-order-btn" onClick={scrollToForm}>
          اشتري الآن
        </button>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="modal-overlay" onClick={() => setShowSuccess(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">✅</div>
            <h3 className="modal-title">تم إرسال طلبك!</h3>
            <p className="modal-text">سنتواصل معك قريباً للتأكيد</p>
            <button className="modal-btn" onClick={() => setShowSuccess(false)}>
              حسناً
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
