import styles from './Post.module.css';
import { Comment } from './Comment';
import { Avatar } from './Avatar';

import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { ChangeEvent, FormEvent, useState } from 'react';

interface Author {
    avatarUrl: string,
    name: string,
    role: string
}

interface Content {
    type: 'paragraph' | 'link' | string,
    content: string
}

interface PostProps {
    author: Author,
    publishedAt: Date,
    content: Content[]
}

export function Post({ author, publishedAt, content }: PostProps) {
    const [comments, setComments] = useState<string[]>([]);
    const [newComment, setNewComment] = useState('');

    const dateObj = {
        title: format(publishedAt, "dd 'de' LLLL 'às' HH:mm'h'", { locale: ptBR }),
        dateTime: publishedAt.toISOString(),
        content: formatDistanceToNow(publishedAt, { locale: ptBR, addSuffix: true })
    };

    function handleCreateNewComment(event: FormEvent) {
        event.preventDefault();
        setComments([...comments, newComment]);
        setNewComment('');
    }

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        setNewComment(event.target.value);
    }

    function deleteComment(commentToDelete: string) {
        const commentsWithoutDeleted = comments.filter(comment => {
            return comment !== commentToDelete;
        });

        setComments(commentsWithoutDeleted);
    }

    const isNewCommentEmpty = newComment.length === 0;

    return (
        <article className={styles.post}>
            <header className={styles.header}>
                <div className={styles.author}>
                    <Avatar hasBorder src={author.avatarUrl} alt="" />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>
                
                <time title={dateObj.title} dateTime={dateObj.dateTime}>{dateObj.content}</time>
            </header>

            <div className={styles.content}>
                {content.map(line => {
                    let element;

                    if (line.type == 'link') {
                        element = <p key={line.content}><a href=''>{line.content}</a></p>;
                    } else {
                        element = <p key={line.content}>{line.content}</p>
                    }

                    return element;
                })}
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>
                <textarea 
                    name='comment'
                    placeholder='Deixe um comentário'
                    value={newComment}
                    onChange={handleNewCommentChange}
                />

                <footer>
                    <button type='submit' disabled={isNewCommentEmpty}>Publicar</button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(comment => {
                    return (
                        <Comment 
                            key={comment} 
                            content={comment} 
                            onDeleteComment={deleteComment} 
                        />
                    );
                })}
            </div>
        </article>
    );
}