import React, { Component } from "react";
import { connect } from "react-redux";
import { getSocket } from "./socket";

class PrivateChat extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.savechatMessage = this.savechatMessage.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
    }

    savechatMessage(e) {
        if (e.which === 13) {
            getSocket().emit("chat", e.target.value);
            e.target.value = "";
        }
    }

    scrollToBottom() {
        if (!this.element) {
            return;
        }
        const scrollHeight = this.element.scrollHeight;
        const height = this.element.clientHeight;
        const maxScrollTop = scrollHeight - height;
        this.element.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }
    render() {

        if (!this.props.messages || !this.props.onlineUsers) {
            return (
                <div>
                    <p> Loading... </p>
                </div>

            );
        }
        return (
            <div
                className="chatBox"

            >
                <div className="chatWithUsers">
                    <div className="chatMessages"
                        ref={element => (this.element = element)}
                    >
                        {this.props.messages.map(message => (
                            <div className="chats" key={message.chatid}>
                                <div className="imageInChat">
                                    <a href={`/user/${message.id}`}><img className="imageOfAFriend" src={message.avatar_url} /></a>

                                    <div className="chatUser">


                                        <p>{message.first} {message.last} - {message.ts}</p>

                                    </div>
                                </div>
                                <div className="chatMsg">

                                    <p>{message.message}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="chatInputBox">
                    <textarea
                        className="chatMessageInput"
                        onKeyDown={this.savechatMessage}
                        placeholder="type message"
                    />
                </div>

            </div>
        );
    }
}

const mapChatMessagestoProps = state => {
    return {
        messages: state.chatMessages
    };
};

export default connect(mapChatMessagestoProps)(PrivateChat);
