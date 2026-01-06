import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { FiStar } from 'react-icons/fi'
import 'swiper/css'
import 'swiper/css/pagination'
import './Testimonials.css'

const Testimonials = () => {
    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: true,
    })

    const testimonials = [
        {
            name: 'Amina B.',
            location: 'Alger',
            text: 'La qualité des vêtements est exceptionnelle ! Ma fille adore sa nouvelle robe. Livraison rapide et service impeccable.',
            rating: 5,
            avatar: '👩',
        },
        {
            name: 'Karim M.',
            location: 'Oran',
            text: 'J\'ai commandé un costume pour mon fils, il est parfait ! Le paiement à la livraison m\'a vraiment rassuré. Merci NR Collection !',
            rating: 5,
            avatar: '👨',
        },
        {
            name: 'Fatima Z.',
            location: 'Constantine',
            text: 'Des modèles magnifiques pour les enfants. J\'apprécie particulièrement le service client via WhatsApp, très réactif !',
            rating: 5,
            avatar: '👩',
        },
        {
            name: 'Youcef L.',
            location: 'Annaba',
            text: 'Première commande et je suis conquis. Les vêtements sont de très bonne qualité et la livraison était rapide.',
            rating: 5,
            avatar: '👨',
        },
        {
            name: 'Sarah K.',
            location: 'Blida',
            text: 'Enfin une boutique qui propose des vêtements élégants pour enfants ! Les tailles sont fidèles, je recommande vivement.',
            rating: 5,
            avatar: '👩',
        },
    ]

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <FiStar
                key={i}
                className={`testimonial__star ${i < rating ? 'testimonial__star--filled' : ''}`}
            />
        ))
    }

    return (
        <section className="testimonials">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">Ce Que Disent Nos Clients</h2>
                    <p className="section-subtitle">
                        La satisfaction de nos clients est notre priorité. Découvrez leurs témoignages.
                    </p>
                </motion.div>

                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={30}
                        slidesPerView={1}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                        }}
                        className="testimonials__swiper"
                    >
                        {testimonials.map((testimonial, index) => (
                            <SwiperSlide key={index}>
                                <div className="testimonial">
                                    <div className="testimonial__rating">
                                        {renderStars(testimonial.rating)}
                                    </div>
                                    <p className="testimonial__text">"{testimonial.text}"</p>
                                    <div className="testimonial__author">
                                        <div className="testimonial__avatar">{testimonial.avatar}</div>
                                        <div className="testimonial__info">
                                            <span className="testimonial__name">{testimonial.name}</span>
                                            <span className="testimonial__location">{testimonial.location}</span>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </motion.div>
            </div>
        </section>
    )
}

export default Testimonials
