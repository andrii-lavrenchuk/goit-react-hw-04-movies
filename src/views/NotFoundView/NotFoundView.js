import errorImg from '../../img/error.jpg';
import s from './NotFoundView.module.css';

export default function NotFoundView() {
  return (
    <div className={s.main}>
      <img className={s.img} src={errorImg} width="650" alt="Page not found" />
      <h1 className={s.title}>404 Page not found</h1>
    </div>
  );
}
