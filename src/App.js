import { createElement, Component } from "rax";
import ScrollView from "rax-scrollview";
import View from "rax-view";
import Touchable from "rax-touchable";
import Text from "rax-text";
import Image from "rax-image";
const native = require("@weex-module/test");

import Notification from "../box-ui/common/notification";
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
        if (res.code === "200") {
          native.back();
        } else {
          this.reset();
          if (res.code === "401") {
            alert(
              "学号或者密码错误，请确认您可以正常登录 one.ccnu.edu.cn。新生请先在 one.ccnu.edu.cn 激活您的账号并重置密码。账号为学号，初始密码为身份证后六位。若可以登陆 one.ccnu.edu 但不能登陆匣子，可加匣子交流群 576225292 咨询。"
            );
          } else {
            alert("服务端错误，登录失败");
          }
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
        <Notification pageId="com.muxistudio.login" />
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
              value={this.state.sid}
              keyboardType="number-pad"
              placeholder="请输入学号"
              width={550}
              height={100}
              onInput={this.onSidChange}
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
              value={this.state.pwd}
              placeholder="请输入密码"
              width={550}
              height={100}
              password
              onChange={this.onPwdChange}
              onInput={this.onPwdChange}
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
            <Touchable
              onPress={() => {
                alert(
                  "新生用户名为学号，初始密码（如果未修改）为证件号后6位（其中大陆学生证件号为身份证号，港澳学生证件号为回乡证号，台湾学生证件号为台胞证号，外国留学生证件号为护照号），忽略括号，字母均为小写。如果登陆失败，新生请先尝试用默认密码登陆 one.ccnu.edu.cn。如果不能登陆，说明学校还未激活账号。若有疑问可加匣子交流群 576225292 咨询"
                );
              }}
            >
              <Text
                style={{
                  color: "#ccccff",
                  fontSize: 27,
                  marginTop: 25
                }}
              >
                对密码有疑问？（新生看这里）
              </Text>
            </Touchable>
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
