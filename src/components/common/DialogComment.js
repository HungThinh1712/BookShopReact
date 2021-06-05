import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Rating from '@material-ui/lab/Rating';
import { useDispatch, } from 'react-redux';
import * as commentActions from './../../actions/commentAction'
import {useTranslation} from 'react-i18next'

export default function FormDialog(props) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [rate, setRate] = useState(props.props.rating);
    const [title, setTitle] = useState(props.props.title);
    const [content, setContent] = useState(props.props.content);
    const handleRatingChange = e => {
        setRate(e.target.value);
    };
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };
    const handleContentChange = (e) => {
        setContent(e.target.value);
    };
    const handleDeleteClick =()=>{
        dispatch(commentActions.deleteComment(props.props.id,props.props.bookId))
        props.onClose();
        props.action();
    }

    const handleSubmit = async e => {
        const id = props.props.id;
        const userId = props.props.userId
        const bookId = props.props.bookId
        const createAt = props.props.createAt
        const page = props.page
        const commentData = { id, userId, bookId, rate, content, title, createAt,page };
        await dispatch(commentActions.updateComment(commentData))
        props.onClose();

    };
    
    return (
        <div>
            {props.tag === 0 ? <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{t('Customer_Detail.25')}</DialogTitle>
                <DialogContent>
                    <div >
                        <div className="stars" >
                            <Rating onChange={handleRatingChange} size="large" value={rate} />
                        </div>
                        <div><input onChange={handleTitleChange} value={title} style={{ marginBottom: '10px', padding: '5px' }} placeholder='Nhập tiêu đề bình luận' /></div>
                    </div>
                    <div className="input-your-rating" >
                        <textarea onChange={handleContentChange} value={content} rows="3" cols="53" name="comment" style={{ fontSize: '16px', padding: '5px' }}></textarea>
                    </div>

                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose} color="primary">
                        {t('Admin_Other.29')}
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        {t('Customer_Detail.27')}
                    </Button>
                </DialogActions>
            </Dialog> : <Dialog
                open={props.open} onClose={props.onClose}
            >

                    <DialogContent>
                        <DialogTitle id="alert-dialog-description">
                            {t('Customer_Detail.26')}
                    </DialogTitle>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteClick} color="primary">
                            {t('Customer_Detail.24')}
                        </Button>
                        <Button onClick={props.onClose} color="primary" autoFocus>
                            {t('Admin_Other.29')}
                        </Button>
                    </DialogActions>
                </Dialog>}
        </div>
    );
}


