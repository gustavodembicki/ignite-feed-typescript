import styles from './Comment.module.css';
import { ThumbsUp, Trash } from 'phosphor-react';
import { Avatar } from './Avatar';
import { useState } from 'react';

interface CommentProps {
    content: string;
    onDeleteComment: (comment: string) => void;
}

export function Comment({ content, onDeleteComment }: CommentProps) {
    const [likeCount, setLikeCount] = useState(0);
    
    function handleDeleteComment() {
        onDeleteComment(content);
    }

    function handleLikeComment() {
        setLikeCount((likeState) => likeState + 1);
    }

    return (
        <div className={styles.comment}>
            <Avatar 
                hasBorder={false} 
                src="https://github.com/gustavodembicki.png" 
                alt=""
            />

            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Gustavo Felipe Dembicki</strong>
                            <time title='27 de Maio de 2022 às 16:34' dateTime='2022-11-27 16:34:00'>Cerca de 1h atrás</time>
                        </div>

                        <button title='Deletar comentário' onClick={handleDeleteComment}>
                            <Trash size={24} />
                        </button>
                    </header>

                    <p>{content}</p>
                </div>

                <footer>
                    <button onClick={handleLikeComment}>
                        <ThumbsUp />
                        Aplaudir <span>{likeCount}</span>
                    </button>
                </footer>
            </div>
        </div>
    );
}