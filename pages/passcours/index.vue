<template>
    <v-row justify="center" align="center">
        <v-col cols="12" sm="10" md="10">
            <v-card>
                <v-card-title class="headline">
                    ค้นหา
                </v-card-title>
                <v-card-text>
                    <v-container id="input-usage" fluid>
                        <v-row>
                            <v-col cols="3" class="text-right">
                                เลือกรุ่น :
                            </v-col>
                            <v-col cols="9">
                                <v-select :items="items1" placeholder="--- กรุณาเลือกรุ่น ---"  outlined></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3" class="text-right">
                                เลือกหลักสูตร :
                            </v-col>
                            <v-col cols="9">
                                <v-select :items="items2" placeholder="--- กรุณาเลือกหลักสูตร ---" outlined></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3" class="text-right">
                                ค้นหา :
                            </v-col>
                            <v-col cols="9">
                                <v-text-field outlined dense></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3" class="text-right">
                                วันที่เริ่มต้น :
                            </v-col>
                            <v-col cols="9" sm="8" md="8">
                                <v-menu
                                    ref="menu"
                                    v-model="menu"
                                    :close-on-content-click="false"
                                    :return-value.sync="date"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="date"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        outlined
                                    ></v-text-field>
                                    </template>
                                    <v-date-picker
                                    v-model="date"
                                    no-title
                                    scrollable
                                    >
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="menu = false"
                                    >
                                        Cancel
                                    </v-btn>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="$refs.menu.save(date)"
                                    >
                                        OK
                                    </v-btn>
                                    </v-date-picker>
                                </v-menu>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3" class="text-right">
                                วันที่สิ้นสุด :
                            </v-col>
                            <v-col cols="9" sm="8" md="8">
                                <v-menu
                                    ref="menu2"
                                    v-model="menu2"
                                    :close-on-content-click="false"
                                    :return-value.sync="date"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="date2"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        outlined
                                    ></v-text-field>
                                    </template>
                                    <v-date-picker
                                    v-model="date2"
                                    no-title
                                    scrollable
                                    >
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="menu2 = false"
                                    >
                                        Cancel
                                    </v-btn>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="$refs.menu2.save(date)"
                                    >
                                        OK
                                    </v-btn>
                                    </v-date-picker>
                                </v-menu>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3" class="text-right">
                                <!--  -->
                            </v-col>
                            <v-col cols="9">
                                <v-btn
                                dark
                                color="teal"
                                >
                                    <v-icon left dark small>
                                       mdi-magnify
                                    </v-icon>
                                ค้นหา
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="12" sm="10" md="10">
            <v-card>
                <v-card-title class="headline">
                 ระบบ Report ผู้ผ่านการเรียน <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field
                ></v-card-title>
                <v-card-text>
                <v-data-table
                    :headers="headers"
                    :items="data"
                    item-key="name"
                    class="elevation-1"
                    :search="search"
                >
                </v-data-table>
                </v-card-text>
                <v-card-text>
                      <v-btn
                        color="primary"
                        dark
                        class="mb-1 mt-3 mr-1 btn btn-search"
                        v-bind="attrs"
                        v-on="on"
                        href="#" 
                      >
                        <v-icon>mdi-folder-move</v-icon>
                            Export
                        </v-btn>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>

export default {
    auth: true,
    name: "Passcours",
    layout: "dashboard",
    data: function () {
        return {
            loading: true,
            search: "",
            items1: ['1', '2'],
            items2: ['1', '2'],
            items3: ['10', '25', '50', '100'],
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            date2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            menu: false,
            menu2: false,
            data: [
            {
                name: "sun xxx",
                id: "XXXXXXX",
                menberType: "Type A",
                address: "188/22",
                province: "สุพรรณบุรี",
                businessType: "Type A",
                phone: "06x-xxx-xxxx",
                email: "sun@gmail.com",
                course: "คณิตศาสตร์",
                date: "01/06/2022",
                certificate: "0" ,
                diploma: "1",
            },
            {
                name: "day xxx",
                id: "XXXXXXX",
                menberType: "Type A",
                address: "188/22",
                province: "สุพรรณบุรี",
                businessType: "Type A",
                phone: "06x-xxx-xxxx",
                email: "sun@gmail.com",
                course: "คณิตศาสตร์",
                date: "01/06/2022",
                certificate: "0" ,
                diploma: "1",
            },
            ],
        }
    },
    computed: {
        headers() {
        return [
            {
            text: "ชื่อ-นามสกุล",
            sortable: true,
            value: "name",
            },
            {
            text: "รหัสบัตรประชาชน",
            sortable: true,
            value: "id",
            },
            { 
            text: "ประเภทสมาชิก", 
            sortable: false, 
            value: "menberType",
            },
            { 
            text: "สมาชิกที่อยู่", 
            sortable: false, 
            value: "address",
            },
            { 
            text: "จังหวัด", 
            sortable: false, 
            value: "province",
            },
            { 
            text: "ประเภทธุรกิจ", 
            sortable: false, 
            value: "businessType",
            },
            { 
            text: "โทรศัพท์", 
            sortable: false, 
            value: "phone",
            },
            { 
            text: "e-mail", 
            sortable: false, 
            value: "email",
            },
            { 
            text: "ชื่อหลักสูตร", 
            sortable: false, 
            value: "course",
            },
            { 
            text: "วันที่สอบผ่าน", 
            sortable: false, 
            value: "date",
            },
            { 
            text: "พิมพ์ใบผ่านการอบรม", 
            sortable: false, 
            value: "certificate",
            },
            { 
            text: "บันทึกใบผ่านการประกาศนียบัตร", 
            sortable: false, 
            value: "diploma",
            },
        ];
        },
    },

};
</script>

