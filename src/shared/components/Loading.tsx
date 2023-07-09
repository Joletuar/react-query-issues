import styles from '../styles/Loading.module.css';

export const Loading = () => {
  return (
    <div className='w-100 h-100 d-flex align-items-center justify-content-center'>
      <div className='row'>
        <div className={styles['lds-default']}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
