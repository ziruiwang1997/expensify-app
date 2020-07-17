// Higher Order Component (HOC) - A component (HOC) that renders another component
// Reuse code
// Render hijacking
// Prop manipulation
// Abstract state

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (//一个标题
  <div>
    <h1>Info</h1>
    <p>The info is: {props.info}</p>
  </div>
);

const withAdminWarning = (WrappedComponent) => {//传入一个reuse的component 输出一个和isAdmin绑定的component
  return (props) => (
    <div>
      {props.isAdmin && <p>This is private info. Please don't share!</p>}
      <WrappedComponent {...props} />
    </div>
  );
};

const requireAuthentication = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAuthenticated ? (
        <WrappedComponent {...props} />
      ) : (
          <p>Please login to view the info</p>
        )}
    </div>
  );
};

const AdminInfo = withAdminWarning(Info);//这里相当于给withAdminWarning传入一个基础组件
const AuthInfo = requireAuthentication(Info);

//一开始withdrawAdmin只接收了const Info这一个组件 这个组件调用了props.info属性 但是这个属性不存在
//在render方法里我们又给withdrawAdmin的实例里追加了两个属性 isAdmin和info 这样constInfo就能调用这两个
//属性来渲染对应的内容了
ReactDOM.render(<AdminInfo isAdmin={true} info="There are the details" />, document.getElementById('app'));
//ReactDOM.render(<AuthInfo isAuthenticated={true} info="There are the details" />, document.getElementById('app'));
