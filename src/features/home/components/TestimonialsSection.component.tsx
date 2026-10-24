import { TESTIMONIALS } from '@/features/content/data/pages.data';
import styles from './TestimonialsSection.module.css';

/**
 * PRD 4.2 "Nuestros antojaditos nos cuentan…": chat-style reviews. Placeholder chats drawn
 * in HTML until Santanita sends real screenshots (then swap for images).
 */
export function TestimonialsSection() {
  return (
    <section className={styles.section} aria-labelledby="testimonials-title">
      <h2 id="testimonials-title" className={`${styles.title} font-display`}>
        Nuestros antojaditos nos cuentan…
      </h2>
      <ul className={styles.track}>
        {TESTIMONIALS.map((item) => (
          <li key={item.name} className={styles.chat}>
            <header className={styles.chatHeader}>
              <span className={styles.avatar} aria-hidden="true">
                {item.name.charAt(0)}
              </span>
              <span>
                <strong>{item.name}</strong>
                <span className={styles.district}>{item.district}</span>
              </span>
            </header>
            <p className={`${styles.bubble} ${styles.incoming}`}>
              {item.message}
              <span className={styles.time}>{item.time}</span>
            </p>
            <p className={`${styles.bubble} ${styles.outgoing}`}>
              {item.reply}
              <span className={styles.time}>{item.time} ✓✓</span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
