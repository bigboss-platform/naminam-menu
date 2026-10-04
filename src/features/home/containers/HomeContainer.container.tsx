import { FeaturedSection } from '../components/FeaturedSection.component';
import { HomeHero } from '../components/HomeHero.component';
import styles from './HomeContainer.module.css';

export function HomeContainer() {
  return (
    <div className={`${styles.page} page-fade-in`}>
      <HomeHero />
      <FeaturedSection />
    </div>
  );
}
