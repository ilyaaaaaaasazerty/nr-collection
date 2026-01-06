import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import { FaWhatsapp } from 'react-icons/fa'
import { FiCheck } from 'react-icons/fi'
import 'swiper/css'
import 'swiper/css/pagination'

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    wilaya: '',
    address: '',
  })

  // 10 منتجات
  const products = [
    { id: 1, name: 'فستان الأميرة', price: 3500, image: '👗', color: '#fce4ec', sizes: ['4 سنوات', '6 سنوات', '8 سنوات', '10 سنوات', '12 سنة'] },
    { id: 2, name: 'بدلة أنيقة', price: 5500, image: '🤵', color: '#e8eaf6', sizes: ['4 سنوات', '6 سنوات', '8 سنوات', '10 سنوات', '12 سنة'] },
    { id: 3, name: 'بيجامة قطنية', price: 2200, image: '🌙', color: '#e3f2fd', sizes: ['4 سنوات', '6 سنوات', '8 سنوات', '10 سنوات', '12 سنة'] },
    { id: 4, name: 'جاكيت شتوي', price: 4800, image: '🧥', color: '#fff3e0', sizes: ['4 سنوات', '6 سنوات', '8 سنوات', '10 سنوات', '12 سنة'] },
    { id: 5, name: 'فستان تول', price: 4200, image: '💃', color: '#fce4ec', sizes: ['4 سنوات', '6 سنوات', '8 سنوات', '10 سنوات', '12 سنة'] },
    { id: 6, name: 'طقم رياضي', price: 2800, image: '🏃', color: '#e8f5e9', sizes: ['4 سنوات', '6 سنوات', '8 سنوات', '10 سنوات', '12 سنة'] },
    { id: 7, name: 'قميص أنيق', price: 2500, image: '👔', color: '#e3f2fd', sizes: ['4 سنوات', '6 سنوات', '8 سنوات', '10 سنوات', '12 سنة'] },
    { id: 8, name: 'تنورة مكشكشة', price: 2000, image: '👯', color: '#fff8e1', sizes: ['4 سنوات', '6 سنوات', '8 سنوات', '10 سنوات', '12 سنة'] },
    { id: 9, name: 'سترة صوفية', price: 3200, image: '🧶', color: '#ffebee', sizes: ['4 سنوات', '6 سنوات', '8 سنوات', '10 سنوات', '12 سنة'] },
    { id: 10, name: 'طقم مواليد', price: 3800, image: '👶', color: '#f3e5f5', sizes: ['4 سنوات', '6 سنوات', '8 سنوات', '10 سنوات', '12 سنة'] },
  ]

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
    return new Intl.NumberFormat('ar-DZ').format(price) + ' دج'
  }

  const handleSelectProduct = (product) => {
    setSelectedProduct(product)
    setSelectedSize(product.sizes[0])
    setQuantity(1)
    // Scroll to order form
    document.getElementById('order-form').scrollIntoView({ behavior: 'smooth' })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const calculateTotal = () => {
    if (!selectedProduct) return 0
    return selectedProduct.price * quantity
  }

  const generateWhatsAppMessage = () => {
    const total = calculateTotal()
    const message = `🛍️ *طلب جديد - NR Collection*

👤 *الاسم:* ${formData.name}
📱 *الهاتف:* ${formData.phone}
📍 *الولاية:* ${formData.wilaya}
🏠 *العنوان:* ${formData.address}

📦 *الطلب:*
• المنتج: ${selectedProduct?.name}
• المقاس: ${selectedSize}
• الكمية: ${quantity}

💰 *المجموع:* ${formatPrice(total)}

💳 *الدفع عند الاستلام*`

    return encodeURIComponent(message)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const phoneNumber = '213561761020'
    const message = generateWhatsAppMessage()
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
    setShowSuccess(true)
  }

  const isFormValid = selectedProduct && selectedSize && formData.name && formData.phone && formData.wilaya && formData.address

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="container">
          <img src="/logo.png" alt="NR Collection" className="header__logo" />
        </div>
      </header>

      <main>
        {/* Products Section */}
        <section className="section">
          <div className="container">
            <h2 className="section-title"> 👇 Nouvelle collection d'hiver </h2>

            <Swiper
              modules={[Pagination]}
              spaceBetween={16}
              slidesPerView={1.15}
              centeredSlides={true}
              pagination={{ clickable: true }}
            >
              {products.map((product) => (
                <SwiperSlide key={product.id}>
                  <div
                    className={`product-card ${selectedProduct?.id === product.id ? 'selected' : ''}`}
                    onClick={() => handleSelectProduct(product)}
                  >
                    <div
                      className="product-card__image"
                      style={{ backgroundColor: product.color }}
                    >
                      {product.image}
                    </div>
                    <div className="product-card__content">
                      <h3 className="product-card__name">{product.name}</h3>
                      <p className="product-card__price">{formatPrice(product.price)}</p>
                      <div className="product-card__sizes">
                        {product.sizes.map((size, i) => (
                          <span key={i} className="product-card__size">{size}</span>
                        ))}
                      </div>
                      <button className="product-card__select-btn">
                        {selectedProduct?.id === product.id ? '✓ تم الاختيار' : 'اختيار'}
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        {/* Order Form Section */}
        <section id="order-form" className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <h2 className="section-title">أكمل طلبك 📝</h2>

            <form className="order-form" onSubmit={handleSubmit}>
              {/* Selected Product Display */}
              {selectedProduct ? (
                <div className="order-form__selected">
                  <p className="order-form__selected-title">المنتج المختار:</p>
                  <p className="order-form__selected-name">{selectedProduct.image} {selectedProduct.name}</p>
                  <p className="order-form__selected-price">{formatPrice(selectedProduct.price)}</p>
                </div>
              ) : (
                <div className="order-form__selected" style={{ background: '#737373' }}>
                  <p>☝️ اختر منتج من الأعلى</p>
                </div>
              )}

              {/* Size Selection */}
              {selectedProduct && (
                <div className="form-group">
                  <label>المقاس</label>
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    required
                  >
                    {selectedProduct.sizes.map((size, i) => (
                      <option key={i} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Quantity */}
              {selectedProduct && (
                <div className="form-group">
                  <label>الكمية</label>
                  <div className="quantity-control">
                    <button
                      type="button"
                      className="quantity-btn"
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    >
                      -
                    </button>
                    <span className="quantity-value">{quantity}</span>
                    <button
                      type="button"
                      className="quantity-btn"
                      onClick={() => setQuantity(q => q + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Customer Info */}
              <div className="form-group">
                <label>الاسم الكامل *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="أدخل اسمك"
                  required
                />
              </div>

              <div className="form-group">
                <label>رقم الهاتف *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="07XXXXXXXX"
                  required
                  style={{ direction: 'ltr', textAlign: 'left' }}
                />
              </div>

              <div className="form-group">
                <label>الولاية *</label>
                <select
                  name="wilaya"
                  value={formData.wilaya}
                  onChange={handleChange}
                  required
                >
                  <option value="">اختر الولاية</option>
                  {wilayas.map((wilaya, i) => (
                    <option key={i} value={wilaya}>{wilaya}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>العنوان بالتفصيل *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="البلدية، الحي، الشارع..."
                  rows="3"
                  required
                />
              </div>

              {/* Total */}
              {selectedProduct && (
                <div className="order-total">
                  <span className="order-total__label">المجموع:</span>
                  <span className="order-total__value">{formatPrice(calculateTotal())}</span>
                </div>
              )}

              {/* COD Badge */}
              <div className="cod-badge">
                <FiCheck size={20} />
                الدفع عند الاستلام
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="submit-btn"
                disabled={!isFormValid}
              >
                <FaWhatsapp size={28} />
                تأكيد الطلب عبر واتساب
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p className="footer__text">NR Collection © 2026</p>
          <p className="footer__phone">+213 561 761 020</p>
        </div>
      </footer>

      {/* WhatsApp Float */}
      <a
        href="https://wa.me/213561761020"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
      >
        <FaWhatsapp />
      </a>

      {/* Success Message */}
      {showSuccess && (
        <>
          <div className="success-overlay" onClick={() => setShowSuccess(false)} />
          <div className="success-message">
            <div className="success-message__icon">✅</div>
            <h3 className="success-message__title">تم إرسال طلبك!</h3>
            <p className="success-message__text">سنتواصل معك قريباً للتأكيد</p>
            <button
              className="submit-btn"
              onClick={() => setShowSuccess(false)}
              style={{ background: '#22c55e' }}
            >
              حسناً
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default App
