<template>
    <div>
        <el-row>
            <div class="right_box">
                <div class="right_title">
                    <span>个人信息</span>
                </div>
                <div class="right_body" style="display: flex; margin: 0.2rem">
                    <div class="photo">
                        <img src="../../assets/images/logo.png" style="width: 100%; height: 100%; position: absolute">
                    </div>
                    <div class="person_detail">
                        <div class="detail">
                            <span>戴坤恩</span>
                        </div>
                        <div class="detail">
                            <p>邮箱：
                                <strong>3874928374@qq.com</strong>
                            </p>
                            <p>手机：
                                <strong>12344556464</strong>
                            </p>
                            <p>收货地址：
                                <strong>江苏省 南京市 南京航空航天大学 将军大道 29号</strong>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </el-row>
        <el-row>
            <div class="right_box">
                <div class="right_title">
                    <span>账户余额</span>
                </div>
                <div class="right_body">
                    <div>
                        <p>我的资金账号：
                            <strong>89390293948</strong>
                        </p>
                        <p>总金额：
                            <strong style="color: red">0.00 元</strong>
                        </p>
                    </div>
                </div>
            </div>
        </el-row>
    </div>
</template>

<script>
    export default {

    }
</script>

<style lang="scss" scoped>
    .right_box {
        border:1px solid #dddddd;
        margin-bottom: 0.3rem;
        .right_title {
            font-size: 0.15rem;
            border-bottom: #dddddd;
            background: #e2edfb;
            padding: 5px;
            padding-left: 0.2rem;
        }
        .right_body {
            display: flex;
            margin: 0.2rem;
            .photo {
                width: 1.2rem;
                height: 1.2rem;
                position: relative;
                border: 1px solid #dddddd;
            }
            .person_detail {
                display: flex;
                flex-direction: column;
                margin-left: 0.2rem;
                .detail {
                    font-size: 0.2rem;
                    color: #333333;
                    margin-bottom: 0.1rem;
                }
            }
            p {
                margin-bottom: 0.1rem;
                font-size: 0.12rem;
            }
        }
    }
</style>
