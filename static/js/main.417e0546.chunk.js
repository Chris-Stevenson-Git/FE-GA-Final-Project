(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{20:function(e,t,a){e.exports=a(35)},25:function(e,t,a){},26:function(e,t,a){},27:function(e,t,a){},28:function(e,t,a){},29:function(e,t,a){},35:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(18),s=a.n(o),l=(a(25),a(5)),c=a(6),i=a(8),u=a(7),h=a(12),d=a(1),m="http://localhost:3000",p=function(e){Object(i.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(l.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={form:"login",first_name:"",last_name:"",email:"",password:"",password_confirm:""},e.handleInput=function(t){switch(t.target.name){case"first_name":e.setState({first_name:t.target.value});break;case"last_name":e.setState({last_name:t.target.value});break;case"email":e.setState({email:t.target.value});break;case"password":e.setState({password:t.target.value});break;case"password_confirm":e.setState({password_confirm:t.target.value})}},e.executeSignup=function(){e.state.password===e.state.password_confirm?fetch("".concat(m,"/create_user"),{headers:{"Content-Type":"application/json; charset=utf-8"},method:"POST",body:JSON.stringify({user:{first_name:e.state.first_name,last_name:e.state.last_name,email:e.state.email,password:e.state.password}})}).then((function(t){e.executeLogin()})).catch((function(e){return console.warn(e)})):console.log("Passwords must match")},e.executeLogin=function(){var t={email:e.state.email,password:e.state.password};fetch("".concat(m,"/user_token"),{headers:{"Content-Type":"application/json; charset=utf-8"},method:"POST",body:JSON.stringify({auth:t})}).then((function(e){return e.json()})).then((function(t){localStorage.setItem("cwLoginToken",t.jwt),e.props.setCurrentUser(),e.props.history.push("/")})).catch((function(e){return console.warn(e)}))},e.handleSubmit=function(t){"login"===e.state.form?e.executeLogin():e.executeSignup(),t.preventDefault()},e.setForm=function(t){e.setState({form:t.target.getAttribute("name")})},e}return Object(c.a)(a,[{key:"render",value:function(){return r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("div",{className:"loginButton",onClick:this.setForm,name:"login"},"Login"),"|",r.a.createElement("div",{className:"loginButton",onClick:this.setForm,name:"signup"},"Sign Up"),r.a.createElement("br",null),"signup"===this.state.form&&r.a.createElement("div",null,r.a.createElement("input",{onChange:this.handleInput,name:"first_name",type:"text",placeholder:"Enter First Name"}),r.a.createElement("br",null),r.a.createElement("input",{onChange:this.handleInput,name:"last_name",type:"text",placeholder:"Enter Last Name"})),r.a.createElement("input",{onChange:this.handleInput,name:"email",type:"email",placeholder:"Enter Email"}),r.a.createElement("br",null),r.a.createElement("input",{onChange:this.handleInput,name:"password",type:"password",placeholder:"Enter Password"}),r.a.createElement("br",null),"signup"===this.state.form?r.a.createElement("div",null,r.a.createElement("input",{onChange:this.handleInput,name:"password_confirm",type:"password",placeholder:"Confirm Password"}),r.a.createElement("br",null),r.a.createElement("button",null,"Sign Up")):r.a.createElement("button",null,"Login"))}}]),a}(r.a.Component),f=function(e){Object(i.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(l.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={email:"",error:""},e.handleInput=function(t){e.setState({email:t.target.value})},e.handleSubmit=function(t){var a="Bearer ".concat(localStorage.getItem("cwLoginToken"));fetch("".concat("http://localhost:3000","/add_member_to_household"),{headers:{"Content-Type":"application/json; charset=utf-8",Authorization:a},method:"POST",body:JSON.stringify({email:e.state.email,household:e.props.householdID})}).then((function(e){return e.json()})).then((function(t){"ERROR"===t.result?e.setState({error:t.message}):(e.props.refresh(),e.props.hide())})).catch((function(e){return console.warn(e)})),t.preventDefault()},e}return Object(c.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("h2",null,"Add Member to ",this.props.householdName),""!==this.state.error&&r.a.createElement("p",null,this.state.error),r.a.createElement("input",{onChange:this.handleInput,name:"email",type:"email",placeholder:"Member's Email"}),r.a.createElement("button",null,"Add")),r.a.createElement("button",{onClick:this.props.hide},"Close"))}}]),a}(r.a.Component),g=function(e){Object(i.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(l.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={name:"",location:"",est_time:"",user:"",frequency:"",error:""},e.handleInput=function(t){switch(t.target.name){case"name":e.setState({name:t.target.value});break;case"location":e.setState({location:t.target.value});break;case"est_time":e.setState({est_time:t.target.value});break;case"user":e.setState({user:t.target.value});break;case"frequency":e.setState({frequency:t.target.value})}},e.handleSubmit=function(t){var a="Bearer ".concat(localStorage.getItem("cwLoginToken"));fetch("".concat("http://localhost:3000","/add_chore_to_household"),{headers:{"Content-Type":"application/json; charset=utf-8",Authorization:a},method:"POST",body:JSON.stringify({name:e.state.name,location:e.state.location,est_time:e.state.est_time,user:e.state.user,frequency:e.state.frequency,household:e.props.householdID})}).then((function(e){return e.json()})).then((function(t){"ERROR"===t.result?e.setState({error:t.message}):(e.props.refresh(),e.props.hide())})).catch((function(e){return console.warn(e)})),t.preventDefault()},e}return Object(c.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("h2",null,"Add Chore to ",this.props.householdName),""!==this.state.error&&r.a.createElement("p",null,this.state.error),r.a.createElement("input",{onChange:this.handleInput,name:"name",type:"text",placeholder:"Chore name.."}),r.a.createElement("br",null),r.a.createElement("input",{onChange:this.handleInput,name:"location",type:"text",placeholder:"Location.."}),r.a.createElement("br",null),r.a.createElement("input",{onChange:this.handleInput,name:"est_time",type:"number",placeholder:"Est. duration (mins)"}),r.a.createElement("br",null),r.a.createElement("select",{onChange:this.handleInput,name:"user"},r.a.createElement("option",null,"Auto Assign"),this.props.users.map((function(e){return r.a.createElement("option",{value:e.id},e.first_name)}))),r.a.createElement("br",null),r.a.createElement("input",{onChange:this.handleInput,name:"frequency",type:"number",placeholder:"Days before it has to be repeated"}),r.a.createElement("br",null),r.a.createElement("button",null,"Add")),r.a.createElement("button",{onClick:this.props.hide},"Close"))}}]),a}(r.a.Component),b="http://localhost:3000",E=function(e){Object(i.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(l.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={myHouseholds:[],currentHousehold:"",dashboard:{users:[],chores:[]},current_user_id:void 0,owner:!1,addMember:!1,addChore:!1,scheduledForDeleting:[],scheduledForCompleting:[]},e.setDashboard=function(){var t=e.state.myHouseholds.find((function(t){return t.name===e.state.currentHousehold})),a="Bearer ".concat(localStorage.getItem("cwLoginToken"));fetch("".concat(b,"/household/").concat(t.id),{headers:{Authorization:a}}).then((function(e){return e.json()})).then((function(t){console.log(t),e.setState({dashboard:t}),t.owner===e.props.userID?e.setState({owner:!0}):e.setState({owner:!1})})).catch((function(e){return console.warn(e)}));for(var n=document.getElementsByTagName("input"),r=0;r<n.length;r++)"checkbox"===n[r].type&&(n[r].checked=!1)},e.setCurrentHousehold=function(t){e.setState({currentHousehold:t.target.value})},e.toggleAddMember=function(){!1===e.state.addMember?e.setState({addMember:!0}):e.setState({addMember:!1})},e.toggleAddChore=function(){!1===e.state.addChore?e.setState({addChore:!0}):e.setState({addChore:!1})},e.addToDeleteSchedule=function(t){var a=e.state.scheduledForDeleting;if(a.includes(t.target.value)){var n=a.indexOf(t.target.value);a.splice(n,1)}else a.push(t.target.value);e.setState({scheduledForDeleting:a})},e.delChores=function(){var t="Bearer ".concat(localStorage.getItem("cwLoginToken"));fetch("".concat(b,"/del_chores"),{headers:{"Content-Type":"application/json; charset=utf-8",Authorization:t},method:"POST",body:JSON.stringify({chores:e.state.scheduledForDeleting})}).then((function(t){e.setState({scheduledForDeleting:[]}),e.setDashboard()})).catch((function(e){return console.warn(e)}))},e.addToCompletedSchedule=function(t){var a=e.state.scheduledForCompleting;if(a.includes(t.target.value)){var n=a.indexOf(t.target.value);a.splice(n,1)}else a.push(t.target.value);e.setState({scheduledForCompleting:a})},e.completeChores=function(){var t="Bearer ".concat(localStorage.getItem("cwLoginToken"));fetch("".concat(b,"/complete_chores"),{headers:{"Content-Type":"application/json; charset=utf-8",Authorization:t},method:"PATCH",body:JSON.stringify({chores:e.state.scheduledForCompleting})}).then((function(t){e.setState({scheduledForCompleting:[]}),e.setDashboard()})).catch((function(e){return console.warn(e)}))},e}return Object(c.a)(a,[{key:"componentDidMount",value:function(){var e=this,t="Bearer ".concat(localStorage.getItem("cwLoginToken"));fetch("".concat(b,"/my_households"),{headers:{Authorization:t}}).then((function(e){return e.json()})).then((function(t){e.setState({myHouseholds:t,currentHousehold:t[0].name}),e.setDashboard()})).catch((function(e){return console.warn(e)}))}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,this.state.addMember&&r.a.createElement(f,{hide:this.toggleAddMember,householdName:this.state.currentHousehold,householdID:this.state.dashboard.id,refresh:this.setDashboard}),this.state.addChore&&r.a.createElement(g,{hide:this.toggleAddChore,householdName:this.state.currentHousehold,householdID:this.state.dashboard.id,users:this.state.dashboard.users,refresh:this.setDashboard}),r.a.createElement("div",{className:"dashboard"},r.a.createElement("h1",null,"Dashboard for "),r.a.createElement("select",{onChange:this.setCurrentHousehold},this.state.myHouseholds.map((function(e){return r.a.createElement("option",null,e.name)}))),r.a.createElement("button",{onClick:this.setDashboard},"Load")),r.a.createElement("div",{className:"householdMembers"},r.a.createElement("h2",null,"Members: "),r.a.createElement("ul",null,this.state.dashboard.users.map((function(t,a){var n;return e.state.dashboard.users.map((function(a){a.id===t.id&&(n="member".concat(e.state.dashboard.users.indexOf(a)))})),r.a.createElement("li",{className:n},t.first_name," ",t.last_name.charAt(0),".")})),this.state.owner&&r.a.createElement("li",{onClick:this.toggleAddMember},"Add Member..."))),r.a.createElement("div",{className:"myChores"},r.a.createElement("h2",null,"My Chores"),r.a.createElement("ul",null,this.state.dashboard.chores.map((function(t){if(e.props.userID===parseInt(t.user_id)){var a="myChores".concat(t.id),n="chore incomplete";return t.completed&&(n="chore completed"),r.a.createElement("div",{className:n},!1===t.completed&&r.a.createElement("input",{type:"checkbox",value:t.id,id:a,onClick:e.addToCompletedSchedule}),r.a.createElement("label",{htmlFor:a},t.name))}}))),r.a.createElement("button",{onClick:this.completeChores},"Mark Completed")),r.a.createElement("div",{className:"allChores"},r.a.createElement("h2",null,"All Chores: "),r.a.createElement("ul",null,this.state.owner&&r.a.createElement("li",{className:"addChore",onClick:this.toggleAddChore},"Add Chore..."),this.state.dashboard.chores.map((function(t){var a;e.state.dashboard.users.map((function(n){n.id===parseInt(t.user_id)&&(a="member".concat(e.state.dashboard.users.indexOf(n)))}));var n="allChores".concat(t.id);return r.a.createElement("li",{className:a},r.a.createElement("input",{type:"checkbox",value:t.id,id:n,onClick:e.addToDeleteSchedule}),r.a.createElement("label",{htmlFor:n},t.name))}))),this.state.owner&&r.a.createElement("button",{onClick:this.delChores},"Delete")))}}]),a}(r.a.Component),v=function(e){Object(i.a)(a,e);var t=Object(u.a)(a);function a(){return Object(l.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"frontPage"},"Chore Wheel App")}}]),a}(r.a.Component),C=(a(26),a(27),a(28),a(29),function(e){Object(i.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(l.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={current_user_name:void 0,current_user_id:void 0},e.setCurrentUser=function(){var t="Bearer ".concat(localStorage.getItem("cwLoginToken"));fetch("".concat("http://localhost:3000","/users/current"),{headers:{Authorization:t}}).then((function(e){return e.json()})).then((function(t){console.log(t),null!=t&&e.setState({current_user_name:t.name,current_user_id:t.id})})).catch((function(e){return console.warn(e)}))},e.handleLogout=function(){e.setState({current_user_name:void 0}),localStorage.removeItem("cwLoginToken")},e}return Object(c.a)(a,[{key:"componentDidMount",value:function(){this.setCurrentUser()}},{key:"render",value:function(){var e=this;return r.a.createElement(h.a,null,r.a.createElement("header",null,r.a.createElement("nav",null,void 0!==this.state.current_user_name?r.a.createElement("ul",null,r.a.createElement("li",null,"Welcome ",this.state.current_user_name," | "),r.a.createElement("li",null,r.a.createElement(h.b,{onClick:this.handleLogout,to:"/"},"Logout"))):r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(h.b,{to:"/login"},"Login/Signup"))))),void 0!==this.state.current_user_name?r.a.createElement(d.a,{exact:!0,path:"/",render:function(t){return r.a.createElement(E,Object.assign({userID:e.state.current_user_id},t))}}):r.a.createElement(d.a,{exact:!0,path:"/",component:v}),r.a.createElement(d.a,{exact:!0,path:"/login",render:function(t){return r.a.createElement(p,Object.assign({setCurrentUser:e.setCurrentUser},t))}}))}}]),a}(r.a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(C,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[20,1,2]]]);
//# sourceMappingURL=main.417e0546.chunk.js.map