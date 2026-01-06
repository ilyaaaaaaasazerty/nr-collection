import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { FiShoppingBag, FiHeart, FiEye } from 'react-icons/fi'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './Products.css'

const Products = () => {
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true,
    })

    const [selectedProduct, setSelectedProduct] = useState(null)

    // Sample product data - 10 clothing pieces for kids
    const products = [
        {
            id: 1,
            name: 'Robe Princesse Florale',
            price: 3500,
            category: 'Filles',
            sizes: ['2-3 ans', '4-5 ans', '6-7 ans'],
            image: '👗',
            description: 'Magnifique robe à motifs floraux, parfaite pour les occasions spéciales.',
            color: '#f8c8dc',
        },
        {
            id: 2,
            name: 'Ensemble Costume Chic',
            price: 5500,
            category: 'Garçons',
            sizes: ['2-3 ans', '4-5 ans', '6-7 ans', '8-9 ans'],
            image: '🤵',
            description: 'Costume élégant pour les grandes occasions de vos petits gentlemen.',
            color: '#e8e8e8',
        },
        {
            id: 3,
            name: 'Pyjama Coton Doux',
            price: 2200,
            category: 'Mixte',
            sizes: ['2-3 ans', '4-5 ans', '6-7 ans'],
            image: '🌙',
            description: 'Pyjama ultra-doux en coton bio pour des nuits confortables.',
            color: '#b8d4e3',
        },
        {
            id: 4,
            name: 'Veste Hiver Tendance',
            price: 4800,
            category: 'Mixte',
            sizes: ['3-4 ans', '5-6 ans', '7-8 ans', '9-10 ans'],
            image: '🧥',
            description: 'Veste chaude et stylée pour affronter l\'hiver avec élégance.',
            color: '#c9b896',
        },
        {
            id: 5,
            name: 'Robe Tutu Pailletée',
            price: 4200,
            category: 'Filles',
            sizes: ['2-3 ans', '4-5 ans', '6-7 ans'],
            image: '💃',
            description: 'Robe tutu avec paillettes pour les petites danseuses.',
            color: '#ddb8d8',
        },
        {
            id: 6,
            name: 'Jogging Sport Confort',
            price: 2800,
            category: 'Garçons',
            sizes: ['4-5 ans', '6-7 ans', '8-9 ans', '10-11 ans'],
            image: '🏃',
            description: 'Jogging sportif et confortable pour les enfants actifs.',
            color: '#98d898',
        },
        {
            id: 7,
            name: 'Chemise Élégante',
            price: 2500,
            category: 'Garçons',
            sizes: ['3-4 ans', '5-6 ans', '7-8 ans'],
            image: '👔',
            description: 'Chemise habillée pour les petits messieurs chic.',
            color: '#a8c8e8',
        },
        {
            id: 8,
            name: 'Jupe Volantée',
            price: 2000,
            category: 'Filles',
            sizes: ['2-3 ans', '4-5 ans', '6-7 ans', '8-9 ans'],
            image: '👯',
            description: 'Jupe à volants légère et féminine pour toutes les occasions.',
            color: '#f8d8a8',
        },
        {
            id: 9,
            name: 'Pull-over Tricoté',
            price: 3200,
            category: 'Mixte',
            sizes: ['3-4 ans', '5-6 ans', '7-8 ans', '9-10 ans'],
            image: '🧶',
            description: 'Pull-over doux et chaud avec motifs adorables.',
            color: '#d8a8a8',
        },
        {
            id: 10,
            name: 'Ensemble Bébé Premium',
            price: 3800,
            category: 'Bébé',
            sizes: ['0-6 mois', '6-12 mois', '12-18 mois'],
            image: '👶',
            description: 'Ensemble complet pour bébé en coton bio premium.',
            color: '#f0e8d8',
        },
    ]

    const formatPrice = (price) => {
        return new Intl.NumberFormat('fr-DZ').format(price) + ' DA'
    }

    const scrollToOrder = (product) => {
        // Store selected product in sessionStorage for the order form
        sessionStorage.setItem('selectedProduct', JSON.stringify(product))
        const element = document.querySelector('#order')
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
        // Dispatch custom event to notify OrderForm
        window.dispatchEvent(new CustomEvent('productSelected', { detail: product }))
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: 'easeOut',
            },
        },
    }

    return (
        <section id="products" className="products">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">Notre Collection</h2>
                    <p className="section-subtitle">
                        Découvrez nos 10 pièces sélectionnées avec soin pour habiller vos enfants avec style et confort.
                    </p>
                </motion.div>

                {/* Desktop Grid View */}
                <motion.div
                    ref={ref}
                    className="products__grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                >
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            className="product-card"
                            variants={itemVariants}
                            whileHover={{ y: -10 }}
                        >
                            <div
                                className="product-card__image"
                                style={{ backgroundColor: product.color }}
                            >
                                <span className="product-card__emoji">{product.image}</span>
                                <div className="product-card__overlay">
                                    <button
                                        className="product-card__action"
                                        onClick={() => setSelectedProduct(product)}
                                        aria-label="Voir détails"
                                    >
                                        <FiEye />
                                    </button>
                                    <button
                                        className="product-card__action product-card__action--primary"
                                        onClick={() => scrollToOrder(product)}
                                        aria-label="Commander"
                                    >
                                        <FiShoppingBag />
                                    </button>
                                </div>
                                <span className="product-card__category">{product.category}</span>
                            </div>
                            <div className="product-card__content">
                                <h3 className="product-card__name">{product.name}</h3>
                                <div className="product-card__sizes">
                                    {product.sizes.slice(0, 3).map((size, i) => (
                                        <span key={i} className="product-card__size">{size}</span>
                                    ))}
                                    {product.sizes.length > 3 && (
                                        <span className="product-card__size">+{product.sizes.length - 3}</span>
                                    )}
                                </div>
                                <div className="product-card__footer">
                                    <span className="product-card__price">{formatPrice(product.price)}</span>
                                    <button
                                        className="product-card__buy"
                                        onClick={() => scrollToOrder(product)}
                                    >
                                        Commander
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Mobile Swiper View */}
                <div className="products__swiper">
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={20}
                        slidesPerView={1.2}
                        centeredSlides={true}
                        loop={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        breakpoints={{
                            480: {
                                slidesPerView: 1.5,
                            },
                            640: {
                                slidesPerView: 2,
                                centeredSlides: false,
                            },
                        }}
                    >
                        {products.map((product) => (
                            <SwiperSlide key={product.id}>
                                <div className="product-card">
                                    <div
                                        className="product-card__image"
                                        style={{ backgroundColor: product.color }}
                                    >
                                        <span className="product-card__emoji">{product.image}</span>
                                        <span className="product-card__category">{product.category}</span>
                                    </div>
                                    <div className="product-card__content">
                                        <h3 className="product-card__name">{product.name}</h3>
                                        <div className="product-card__footer">
                                            <span className="product-card__price">{formatPrice(product.price)}</span>
                                            <button
                                                className="product-card__buy"
                                                onClick={() => scrollToOrder(product)}
                                            >
                                                Commander
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            {/* Product Detail Modal */}
            <AnimatePresence>
                {selectedProduct && (
                    <motion.div
                        className="product-modal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProduct(null)}
                    >
                        <motion.div
                            className="product-modal__content"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="product-modal__close"
                                onClick={() => setSelectedProduct(null)}
                            >
                                ×
                            </button>
                            <div
                                className="product-modal__image"
                                style={{ backgroundColor: selectedProduct.color }}
                            >
                                <span className="product-modal__emoji">{selectedProduct.image}</span>
                            </div>
                            <div className="product-modal__info">
                                <span className="badge badge-gold">{selectedProduct.category}</span>
                                <h3 className="product-modal__name">{selectedProduct.name}</h3>
                                <p className="product-modal__description">{selectedProduct.description}</p>
                                <div className="product-modal__sizes">
                                    <span className="product-modal__sizes-label">Tailles disponibles:</span>
                                    <div className="product-modal__sizes-list">
                                        {selectedProduct.sizes.map((size, i) => (
                                            <span key={i} className="product-modal__size">{size}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="product-modal__footer">
                                    <span className="product-modal__price">{formatPrice(selectedProduct.price)}</span>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => {
                                            scrollToOrder(selectedProduct)
                                            setSelectedProduct(null)
                                        }}
                                    >
                                        <FiShoppingBag />
                                        Commander
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

export default Products
