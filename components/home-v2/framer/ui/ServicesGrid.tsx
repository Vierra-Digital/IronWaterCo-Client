import { services } from '../../../../data/homepage'
import Grain from './Grain'
import styles from '../framer-sections.module.css'

export default function ServicesGrid() {
  return (
    <section id="services" className={`${styles.section} ${styles.sectionBase}`}>
      <Grain />
      <div className={styles.inner}>
        <p className={styles.eyebrow}>What we offer</p>
        <h2 className={styles.sectionTitle}>Services</h2>
        <div className={styles.servicesGrid}>
          {services.map((s) => (
            <article key={s.title} className={styles.serviceCard}>
              <h3 className={styles.serviceTitle}>{s.title}</h3>
              <p className={styles.serviceDesc}>{s.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
