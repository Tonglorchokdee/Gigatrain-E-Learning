<template>
    <v-list>
        <template v-for="(menu, menui) in menus">
            <!-- Single Item -->
            <div>
                <v-list-item v-if="!menu.list" :key="menui" link :to="menu.to" router exact>
                    <v-list-item-icon class="mr-4">
                        <v-badge :content="menu.notificaition" :value="menu.notificaition" color="red" overlap>
                            <v-icon v-text="menu.icon" />
                        </v-badge>
                    </v-list-item-icon>
                    <v-badge class="mr-1" color="secondary" inline :content="menu.listnumber" :value="menu.listnumber">
                    </v-badge>
                    <v-list-item-title v-text="menu.title" />
                </v-list-item>
            </div>

            <!-- Multi Item -->
            <div>
                <v-list-group no-action v-if="menu.list" :key="menui">
                    <template v-slot:activator>
                        <v-icon slot="prependIcon" class="mr-4" v-text="menu.icon" />
                        <v-badge class="mr-1" color="secondary" inline :content="menu.listnumber"
                            :value="menu.listnumber">
                        </v-badge>
                        <v-list-item-title v-text="menu.title" />
                    </template>

                    <v-list-item v-for="(sub, subi) in menu.list" :key="subi" link :to="sub.to" router exact>
                        <v-list-item-title v-text="sub.label" />
                    </v-list-item>
                </v-list-group>
            </div>

        </template>
    </v-list>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    name: "sidebar",
    data() {
        // TODO: Implement routes here
        return {
            user: this.$auth.user,
            drawer: null,
            menus: [
                {
                    icon: "mdi-home-outline",
                    title: "หน้าหลัก",
                    to: "/",
                    listnumber: "",
                    notificaition: "",
                },
                {
                    icon: "mdi-apps",
                    title: "หมวดหลักสูตร",
                    to: "/category",
                    listnumber: "1",
                    notificaition: "",
                },
                {
                    icon: "mdi-laptop",
                    title: "จัดการหลักสูตร",
                    to: "/courseOnline",
                    listnumber: "2",
                    notificaition: "",
                },
                {
                    icon: "mdi-school-outline",
                    title: "ระบบบทเรียน",
                    to: "/lesson",
                    listnumber: "3",
                    notificaition: "",
                },
                {
                    icon: "mdi-order-bool-ascending-variant",
                    title: "ระบบชุดข้อสอบ",
                    listnumber: "4",
                    notificaition: "",
                    list: [
                        {
                            label: "จัดการชุดข้อสอบ",
                            to: "/grouptesting",
                        },
                        {
                            label: "จัดการชุดข้อสอบหลักสูตร",
                            to: "/coursegrouptesting",
                        },
                    ],
                },
                {
                    icon: "mdi-comment-question-outline",
                    title: "ระบบแบบสอบถาม",
                    to: "/questionnaire",
                    listnumber: "5",
                    notificaition: "",
                },
                {
                    icon: "mdi-format-list-bulleted-type",
                    title: "ระบบประเภทหลักสูตร",
                    to: "/courseType",
                    listnumber: "",
                    notificaition: "",
                },
                {
                    icon: "mdi-human-male-board",
                    title: "ทะเบียนอาจารย์ผู้อบรม",
                    to: "/manageteacher",
                    listnumber: "",
                    notificaition: "",
                },
                {
                    icon: "mdi-note-check-outline",
                    title: "ตรวจข้อสอบบรรยาย",
                    listnumber: "",
                    notificaition: "",
                    list: [
                        {
                            label: "ตรวจข้อสอบบรรยายบทเรียน",
                            to: "/checklecture/lesson",
                        },
                        {
                            label: "ตรวจข้อสอบบรรยายหลักสูตร",
                            to: "/checklecture/course",
                        },
                    ],
                },
                {
                    icon: "mdi-certificate-outline",
                    title: "ระบบประกาศนียบัตร",
                    listnumber: "",
                    notificaition: "",
                    list: [
                        {
                            label: "จัดการประกาศนียบัตรหมวดหลักสูตร",
                            to: "/certificate/category",
                        },
                        {
                            label: "จัดการประกาศนียบัตรหลักสูตร",
                            to: "/certificate/courseOnline",
                        },
                        {
                            label: "จัดการลายเซ็นต์",
                            to: "/certificate/signatures",
                        },
                    ],
                },
                //  {
                //     icon: "mdi-page-layout-header",
                //     title: "จัดการเมนู",
                //     to: "/mainmenu",
                //     listnumber: "",
                //     notificaition: "",
                // },
                {
                    icon: "mdi-information-outline",
                    title: "เกี่ยวกับเรา",
                    to: "/aboutus/",
                    listnumber: "",
                    notificaition: "",
                },
                {
                    icon: "mdi-newspaper",
                    title: "ระบบบทความ",
                    to: "/article",
                    listnumber: "",
                    notificaition: "",
                },
                {
                    icon: "mdi-domain",
                    title: "ระบบติดต่อเรา",
                    to: "/contactus",
                    listnumber: "",
                    notificaition: "",
                },
                {
                    icon: "mdi-file-document-edit-outline",
                    title: "เงื่อนไขการใช้งานระบบ",
                    to: "/conditions",
                    listnumber: "",
                    notificaition: "",
                },
                {
                    icon: "mdi-image-outline",
                    title: "ป้ายประชาสัมพันธ์",
                    to: "/imgslide",
                    listnumber: "",
                    notificaition: "",
                },
                {
                    icon: "mdi-video-outline",
                    title: "วีดีโอแนะนำ",
                    to: "/videos",
                    listnumber: "",
                    notificaition: "",
                },
                {
                    icon: "mdi-alert-outline",
                    title: "ระบบเเจ้งปัญหาการใช้งาน",
                    to: "/operationproblem",
                    listnumber: "",
                    notificaition: "1",
                },
                {
                    icon: "mdi-chat-question-outline",
                    title: "ระบบวิธีการใช้งาน",
                    to: "/usability",
                    listnumber: "",
                    notificaition: "",
                },
                {
                    icon: "mdi-folder-question-outline",
                    title: "คำถามที่พบบ่อย",
                    listnumber: "",
                    notificaition: "",
                    list: [
                        {
                            label: "หมวดคำถาม",
                            to: "/faq/faqtype",
                        },
                        {
                            label: "จัดการคำถามที่พบบ่อย",
                            to: "/faq",
                        },
                    ],
                },
                {
                    icon: "mdi-folder-download-outline",
                    title: "ระบบเอกสาร",
                    listnumber: "",
                    notificaition: "",
                    list: [
                        {
                            label: "ประเภทเอกสาร",
                            to: "/document/documenttype",
                        },
                        {
                            label: "จัดเอกสาร",
                            to: "/document",
                        },
                    ],
                },
                {
                    icon: "mdi-account-lock-open-outline",
                    title: "ระบบการกำหนดสิทธิการใช้งาน",
                    listnumber: "",
                    notificaition: "",
                    list: [
                        {
                            label: "ข้อมูลผู้ดูแลระบบ",
                            to: "/userpermission/users",
                        },
                        {
                            label: "กลุ่มผู้ใช้งาน",
                            to: "/userpermission/group",
                        },
                    ],
                },
                {
                    icon: "mdi-badge-account-outline",
                    title: "ระบบข้อมูลสมาชิก",
                    to: "/generaluser",
                    listnumber: "",
                    notificaition: "",
                },
                {
                    icon: "mdi-bell-badge-outline",
                    title: "ระบบตั้งค่าแจ้งเตือนบทเรียน",
                    to: "/coursenotification",
                    listnumber: "",
                    notificaition: "",
                },
                {
                    icon: "mdi-cog-refresh-outline",
                    title: "ระบบรีเซ็ตผลการเรียนการเรียน",
                    to: "/learnreset",
                    listnumber: "",
                    notificaition: "",
                },
               
                  {
                    icon: "mdi-email-check-outline",
                    title: "ระบบการส่งผลการเรียนทางอีเมล",
                    to: "/logemail",
                    listnumber: "",
                    notificaition: "",
                },
                 {
                    icon: "mdi-math-log",
                    title: "ระบบเก็บ Log การใช้งาน",
                    listnumber: "",
                    notificaition: "",
                    list: [
                        {
                            label: "Log การใช้งานผู้เรียน",
                            to: "/logusability/users",
                        },
                        {
                            label: "Log การใช้งานผู้ดูเเลระบบ",
                            to: "/logusability/admin",
                        },
                    ],
                },

                 {
                    icon: "mdi-printer-outline",
                    title: "ระบบพิมพ์ใบประกาศนียบัตร",
                    listnumber: "",
                    notificaition: "",
                    list: [
                        {
                            label: "รายงานผู้ผ่านการเรียน",
                            to: "/",
                        },
                        {
                            label: "รายงานสถิติจำนวนผู้พิมพ์ใบประกาศ",
                            to: "/",
                        },
                    ],
                },
                
                {
                    icon: "mdi-file-chart-outline",
                    title: "ระบบ Report",
                    listnumber: "",
                    notificaition: "",
                    list: [
                        {
                            label: "รายงานผู้ผ่านการเรียน",
                            to: "/",
                        },
                        {
                            label: "รายงานการจองคอร์สเรียน",
                            to: "/",
                        },
                    ],
                },
                


            ],
        };
    },
    methods: {
        doLogout: function () {
            this.$auth.logout().then(() => {
                this.redirect("/login");
            });
        },
        redirect: function (path: string) {
            setTimeout(() => this.$router.push(path), 300)
        }
    },
});
</script>

<style lang="scss" scoped>
</style>