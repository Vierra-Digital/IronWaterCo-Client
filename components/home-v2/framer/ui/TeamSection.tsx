import Image from 'next/image'
import { teamMembers } from '../../../../data/homepage'
import Grain from './Grain'
import styles from '../framer-sections.module.css'

export default function TeamSection() {
  return (
    <section id="team" className={`${styles.section} ${styles.sectionBase}`}>
      <Grain />
      <div className={styles.inner}>
        <h2 className={`${styles.sectionTitle} ${styles.sectionTitleCenter}`}>Our Team</h2>
        <div className={styles.teamGrid}>
          {teamMembers.map((m) => (
            <article key={m.name} className={styles.teamCard}>
              {'imageSrc' in m ? (
                <Image
                  src={m.imageSrc}
                  alt={m.name}
                  width={120}
                  height={120}
                  className={styles.teamPhoto}
                />
              ) : (
                <div className={styles.teamInitial}>{m.initials}</div>
              )}
              <h3 className={styles.teamName}>{m.name}</h3>
              <p className={styles.teamRole}>{m.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
