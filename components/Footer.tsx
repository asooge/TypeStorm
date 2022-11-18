import Image from 'next/image';
import styles from 'styles/Home.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <a
        href="https://github.com/asooge"
        target="_blank"
        rel="noopener noreferrer"
      >
        Developed by asooge
        <span>
          <Image
            src="/asooge-profile.jpeg"
            alt="Vercel Logo"
            width={24}
            height={24}
            style={{ borderRadius: '50%', marginLeft: '4px' }}
          />
        </span>
      </a>
    </footer>
  );
};
