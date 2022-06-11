<template>
    <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6">
            <v-card>
                <v-card-title class="headline">
                    {{ $t("news.list.title") }}
                </v-card-title>
                <v-card-text>
                    {{ $t("home.list.description") }}
                </v-card-text>
            </v-card>

            <v-card>
                <v-data-table
                    :headers="headers"
                    :loading="loading"
                    loading-text="Loading... Please wait"
                    :items="items"
                />
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import moment from 'moment'
export default {
    auth: true,
    name: "NewsListPage",
    layout: "dashboard",
    data: function() {
        return {
            loading: true,
            items: [],
            // TODO: กำหนดหัวตารางตรงนี้
            headers: [
                {
                    text: this.$t('news.data.header.title'),
                    align: 'start',
                    sortable: false,
                    value: 'data_title',
                },
                {
                    text: this.$t('news.data.header.type'),
                    align: 'start',
                    sortable: false,
                    value: 'data_type',
                },
                {
                    text: this.$t('news.data.header.created_date'),
                    align: 'start',
                    sortable: false,
                    value: 'created_date',
                }
            ]
        }
    },
    mounted(){
        // TODO: กำหนด Request ที่ต้องการ แล้ว remap data ให้ตรง
        this.$axios.$request({
            url: '/api/news/admin',
            method: 'GET'
        }).then((response) => {
            this.loading = false
            this.items = response.news.map(news => ({
                data_title: news.data_title,
                data_type: news.data_type,
                // TODO: แปลงค่าวันที่ให้ออกเป็น Locale หรือถ้าต้องการกำหนด format เปลี่ยน `.toLocaleString()` เป็น `.format('YYYY/MM/DD HH:mm:ss')` แทนก็ได้
                created_date: moment(news.created_date).toLocaleString(),
            }))
            console.log(this.items)
        }).catch(err => console.error(err))
    }
};
</script>
