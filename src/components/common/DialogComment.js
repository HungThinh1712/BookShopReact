import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Rating from '@material-ui/lab/Rating';
import TextArea from 'antd/lib/input/TextArea';
import { useDispatch, } from 'react-redux';
import * as commentActions from './../../actions/commentAction'

export default function FormDialog(props) {

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
                <DialogTitle id="form-dialog-title">Chỉnh sửa đánh giá</DialogTitle>
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
                        Hủy
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Chỉnh sửa
                    </Button>
                </DialogActions>
            </Dialog> : <Dialog
                open={props.open} onClose={props.onClose}
            >

                    <DialogContent>
                        <DialogTitle id="alert-dialog-description">
                            Bạn có chắc muốn xóa comment này này ?
                    </DialogTitle>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteClick} color="primary">
                            Xóa
                        </Button>
                        <Button onClick={props.onClose} color="primary" autoFocus>
                            Hủy
                        </Button>
                    </DialogActions>
                </Dialog>}
        </div>
    );
}


