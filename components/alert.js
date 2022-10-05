import styles from './alert.module.css'
//classnames is a simple library that lets you toggle class names easily
// install it : npm install classnames 
import cn from 'classnames'

export default function Alert ({ children , type}) {

    return (
        <div
            className = { cn({
                [styles.success] : type ==='success',
                [styles.error]   : type ==='error' , 
            })}
        >
            <p>
                PATA
            </p>
            {children}
        </div>
    );

}
