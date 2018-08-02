import { createElement, Component } from "rax";
import ScrollView from "rax-scrollview";
import View from "rax-view";
import Text from "rax-text";
import Image from "rax-image";
const native = require("@weex-module/test");

import BoxTextInput from "../box-ui/common/text-input";
import BoxButton from "../box-ui/common/button";
import styles from "./App.css";
import gif from "./assets/login.gif";

class App extends Component {
  state = {
    height: 0,
    sid: "",
    pwd: "",
    loading: false
  };

  reset = () => {
    this.setState({
      sid: "",
      pwd: "",
      loading: false
    });
  };

  submit = () => {
    const { sid, pwd, loading } = this.state;
    if (loading) return;
    if (sid === "" || pwd === "") {
      alert("请输入用户名和密码");
    } else {
      this.setState({
        loading: true
      });
      native.mainLogin(sid, pwd, res => {
        if (res.code === 200) {
          native.back();
        } else {
          this.reset();
          // todo: code to message map
          alert(res.code);
        }
      });
    }
  };

  onSidChange = e => {
    this.setState({
      sid: e.nativeEvent.text
    });
  };

  onPwdChange = e => {
    this.setState({
      pwd: e.nativeEvent.text
    });
  };

  render() {
    return (
      <ScrollView
        ref={scrollView => {
          this.horizontalScrollView = scrollView;
        }}
        style={[
          styles.app,
          {
            height: screen.height
          }
        ]}
      >
        <View
          style={[
            styles.container,
            styles.top,
            {
              height: 500
            }
          ]}
        >
          <View style={styles.gif_container}>
            <Image style={[styles.gif]} source={gif} />
          </View>
          <View>
            <BoxTextInput
              keyboardType="number-pad"
              placeholder="请输入学号"
              width={550}
              height={100}
              onChange={this.onSidChange}
            />
          </View>
        </View>
        <View
          style={[
            styles.container,
            styles.bottom,
            {
              height: screen.height - 400 + this.state.height,
              backgroundImage:
                "linear-gradient(to bottom,rgba(103,103,250,1), rgba(204,204,255,1))"
            }
          ]}
        >
          <View>
            <BoxTextInput
              placeholder="请输入密码"
              width={550}
              height={100}
              password
              onChange={this.onPwdChange}
              onFocus={() => {
                if (screen.height - 400 < 400) {
                  this.setState({
                    height: 200
                  });
                  this.horizontalScrollView.scrollTo({ x: 0, y: 200 });
                }
              }}
              onBlur={() => {
                this.setState({
                  height: 0
                });
              }}
            />
            <Text
              style={{
                color: "#ccccff",
                fontSize: 27,
                marginTop: 25
              }}
            >
              密码为 one.ccnu.edu.cn 登录密码
            </Text>
          </View>
          <View style={styles.btn_container}>
            <BoxButton
              onPress={this.submit}
              text={this.state.loading ? "登录中" : "登录"}
              style={styles.btn}
              height={100}
              width={550}
              textStyle={{
                fontSize: 36
              }}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default App;
