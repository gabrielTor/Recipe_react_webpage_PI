import styles from './loading.module.css'

function Loading() {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.loadingSpinner}></div>
    </div>
  );
}

export default Loading;