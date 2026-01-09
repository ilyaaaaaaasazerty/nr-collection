import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { FaStar, FaFacebookF, FaInstagram, FaShoppingCart } from 'react-icons/fa'
import { FiMenu } from 'react-icons/fi'
import 'swiper/css'

// Import dataService and Admin page
import { dataService } from './services/dataService'
import Admin from './pages/Admin'

function Storefront() {
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [currentImage, setCurrentImage] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  const [colorPreview, setColorPreview] = useState(null)
  const [showSummary, setShowSummary] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    wilaya: '',
    commune: '',
  })
  const [errors, setErrors] = useState({})

  // المنتجات
  const products = [
    {
      id: 1,
      name: 'طقم أطفال فاخر بالعيد',
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

  const quantityOptions = [
    { qty: 1, label: 'قطعة واحدة', price: product.price },
    { qty: 2, label: 'قطعتين', price: product.price * 2 - 500 },
    { qty: 3, label: 'ثلاث قطع', price: product.price * 3 - 1200 },
  ]

  const wilayas = [
    '01. أدرار', '02. الشلف', '03. الأغواط', '04. أم البواقي', '05. باتنة', '06. بجاية', '07. بسكرة', '08. بشار',
    '09. البليدة', '10. البويرة', '11. تمنراست', '12. تبسة', '13. تلمسان', '14. تيارت', '15. تيزي وزو', '16. الجزائر',
    '17. الجلفة', '18. جيجل', '19. سطيف', '20. سعيدة', '21. سكيكدة', '22. سيدي بلعباس', '23. عنابة', '24. قالمة',
    '25. قسنطينة', '26. المدية', '27. مستغانم', '28. المسيلة', '29. معسكر', '30. ورقلة', '31. وهران', '32. البيض',
    '33. إليزي', '34. برج بوعريريج', '35. بومرداس', '36. الطارف', '37. تندوف', '38. تيسمسيلت', '39. الوادي',
    '40. خنشلة', '41. سوق أهراس', '42. تيبازة', '43. ميلة', '44. عين الدفلى', '45. النعامة', '46. عين تموشنت',
    '47. غرداية', '48. غليزان', '49. تميمون', '50. برج باجي مختار', '51. أولاد جلال', '52. بني عباس',
    '53. عين صالح', '54. عين قزام', '55. تقرت', '56. جانت', '57. المغير', '58. المنيعة',
    '59. أفلو', '60. بريكة', '61. القنطرة', '62. بئر العاتر', '63. العريشة', '64. قصر الشلالة',
    '65. عين وسارة', '66. مسعد', '67. قصر البخاري', '68. بوسعادة', '69. الأبيض سيدي الشيخ'
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

  const handleSubmit = async (e) => {
    e?.preventDefault()
    if (!validateForm()) return

    const selectedQty = quantityOptions.find(q => q.qty === selectedQuantity)

    const orderData = {
      name: formData.name,
      phone: formData.phone,
      wilaya: formData.wilaya,
      commune: formData.commune,
      productName: product.name,
      size: selectedSize,
      color: selectedColor || 'غير محدد',
      quantity: selectedQty?.label,
      totalPrice: formatPrice(selectedQty?.price || product.price)
    }

    const result = await dataService.saveOrder(orderData)
    if (result.success) {
      setShowSuccess(true)
      // Reset form
      setFormData({ name: '', phone: '', wilaya: '', commune: '' })
      setSelectedSize('')
      setSelectedColor('')
    }
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

          {/* Color Selector */}
          <div className="color-section">
            <h3 className="color-title">اختر اللون</h3>
            <div className="color-options">
              {product.colors.map((color, i) => (
                <div
                  key={color.name}
                  className={`color-option ${selectedColor === color.name ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedColor(color.name)
                    setColorPreview(product.images[i])
                    setCurrentImage(i)
                  }}
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

          {/* Quantity/Price Options */}
          <div className="delivery-section">
            <h3 className="delivery-title">السعر</h3>
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

          {/* Order Button */}
          <button className="order-btn" onClick={handleSubmit}>
            اشتري الآن 🛒
          </button>

          {/* Order Summary Link */}
          <div className="order-summary-link" onClick={() => setShowSummary(true)}>
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
          </div>
        </footer>
      </main>

      {/* Fixed Bottom Bar */}
      <div className="fixed-bottom-bar" style={{ justifyContent: 'center' }}>
        <button className="fixed-order-btn" onClick={scrollToForm} style={{ maxWidth: '400px' }}>
          اشتري الآن
        </button>
      </div>

      {/* Color Preview Modal */}
      {colorPreview && (
        <div className="modal-overlay" onClick={() => setColorPreview(null)}>
          <div className="preview-modal" onClick={(e) => e.stopPropagation()}>
            <button className="preview-modal__close" onClick={() => setColorPreview(null)}>×</button>
            <div className="preview-modal__header">
              <span className="preview-modal__title">اللون المختار: {selectedColor}</span>
            </div>
            <img src={colorPreview} alt="Color Preview" className="preview-modal__image" />
            <button className="preview-modal__btn" onClick={() => setColorPreview(null)}>
              تأكيد الاختيار
            </button>
          </div>
        </div>
      )}

      {/* Order Summary Modal */}
      {showSummary && (
        <div className="modal-overlay" onClick={() => setShowSummary(false)}>
          <div className="summary-modal" onClick={(e) => e.stopPropagation()}>
            <div className="summary-modal__header">
              <h3 className="summary-modal__title">📋 ملخص طلبك</h3>
              <button className="summary-modal__close" onClick={() => setShowSummary(false)}>×</button>
            </div>

            <div className="summary-modal__content">
              <div className="summary-item">
                <span className="summary-item__label">المنتج:</span>
                <span className="summary-item__value">{product.name}</span>
              </div>
              <div className="summary-item">
                <span className="summary-item__label">المقاس:</span>
                <span className="summary-item__value">{selectedSize || 'لم يتم الاختيار'}</span>
              </div>
              <div className="summary-item">
                <span className="summary-item__label">اللون:</span>
                <span className="summary-item__value">{selectedColor || 'لم يتم الاختيار'}</span>
              </div>
              <div className="summary-item">
                <span className="summary-item__label">الكمية:</span>
                <span className="summary-item__value">
                  {quantityOptions.find(q => q.qty === selectedQuantity)?.label}
                </span>
              </div>
              <div className="summary-total">
                <span className="summary-total__label">الإجمالي:</span>
                <span className="summary-total__value">
                  {formatPrice(quantityOptions.find(q => q.qty === selectedQuantity)?.price)}
                </span>
              </div>
            </div>

            <button className="summary-modal__btn" onClick={() => {
              setShowSummary(false)
              handleSubmit()
            }}>
              تأكيد الطلب الآن
            </button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="modal-overlay" onClick={() => setShowSuccess(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">✅</div>
            <h3 className="modal-title">تم استلام طلبك!</h3>
            <p className="modal-text">سنتصل بك قريباً عبر الهاتف لتأكيد التفاصيل</p>
            <button className="modal-btn" onClick={() => setShowSuccess(false)}>
              حسناً
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Storefront />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  )
}

export default App
