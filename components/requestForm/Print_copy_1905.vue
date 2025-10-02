<template>
    <v-col cols="12" class="pb-0 pl-3 pt-3">
      <table class="table table-bordered" style="margin-bottom: 3px">
        <tr>
          <td rowspan="3" class="align-middle text-header">
            <img
              width="50px;"
              src="logo.png"
              class="img-fluid mx-auto"
              style="margin-top: 2px"
              alt=""
            />
            <p style="margin-bottom: 0; line-height: 13px">
              Bộ phận soạn thảo <br />
              編 訂 部 門 <br /> 
              Tổng Vụ 總務部
            </p>
          </td>
          <td rowspan="6" class="text-center align-middle text-header_title">
            <b> ĐƠN ĐỀ NGHỊ SỮA CHỮA </b> <br />
            <p class="mb-0">維修申請單</p>
          </td>
          <td class="align-middle text-header colum3" style="line-height: 13px">
            Ngày thiết lập (sửa đổi) <br />
            制(修)訂日期
          </td>
          <td class="align-middle text-header colum3">13.08.2024</td>
        </tr>
        <tr class="text-header">
          <td class="colum3 align-middle" style="line-height: 13px">
            Mã số tài liệu <br />
            文 件 編 號
          </td>
          <td class="align-middle text-header colum3">ADGA-SP001-02</td>
        </tr>

        <tr class="text-header">
          <td class="colum3 align-middle" style="line-height: 13px">
            Phiên bản 版本<br />
            4
          </td>
          <td class="colum3 align-middle" style="line-height: 13px">
            Trang 頁次 <br />
            1/1
          </td>
        </tr>
      </table>

      <table class="table table-bordered mt-0 mb-1">
        <tr class="textMid">
          <td class="py-1" style="vertical-align: middle">Bộ phận / 部门：</td>
          <td class="py-0" style="vertical-align: middle">
            {{
              dialogDataDetailPrint && dialogDataDetailPrint.dept
                ? dialogDataDetailPrint.dept
                : ""
            }}
          </td>
          <td class="py-0" style="vertical-align: middle">Đơn vị / 单位：</td>
          <td class="py-0" style="vertical-align: middle">
            {{
              dialogDataDetailPrint && dialogDataDetailPrint.high_dept
                ? dialogDataDetailPrint.high_dept
                : ""
            }}
          </td>
          <td class="py-0" style="vertical-align: middle; padding: 0px">
            Ngày xin / 申请日期：
          </td>
          <td class="py-0" style="vertical-align: middle">
            {{
              dialogDataDetailPrint && dialogDataDetailPrint.date_request
                ? dialogDataDetailPrint.date_request
                : ""
            }}
          </td>
        </tr>
        <!-- loại thiết bị -->
        <tr class="textMid">
          <td
            class="pl-1 py-0 pr-0"
            style="vertical-align: middle; text-align: left; line-height: 13px"
          >
            Loại thiết bị <br />
            设备类别
          </td>
          <td colspan=" 5" class="py-0" style="vertical-align: middle">
            <v-row>
              <v-col
                cols="2"
                class="d-flex flex-column align-center justify-center"
                style="line-height: 10px"
              >
                <div class="text-center">Tài sản</div>
                <v-checkbox
                  class="mt-0 pt-0"
                  label="资产"
                  color="blue"
                  value="asset"
                  v-model="dialogDataDetailPrint.type_request"
                  hide-details
                >
                </v-checkbox>
              </v-col>

              <v-col
                cols="2"
                class="d-flex flex-column align-center justify-center"
                style="line-height: 10px"
              >
                <div class="text-center mt-1">Dụng cụ</div>
                <v-checkbox
                  class="mt-0 pt-0"
                  label="机具"
                  color="blue"
                  value="equipment"
                  v-model="dialogDataDetailPrint.type_request"
                  hide-details
                >
                </v-checkbox>
              </v-col>

              <v-col
                cols="2"
                class="d-flex flex-column align-center justify-center"
                style="line-height: 10px"
              >
                <div class="text-center">Máy móc thiết bị</div>
                <v-checkbox
                  class="mt-0 pt-0"
                  label="仪器"
                  color="blue"
                  value="machine"
                  v-model="dialogDataDetailPrint.type_request"
                  hide-details
                >
                </v-checkbox>
              </v-col>

              <v-col
                cols="2"
                class="d-flex flex-column align-center justify-center"
                style="line-height: 10px"
              >
                <div class="text-center">Điện nước</div>
                <v-checkbox
                  class="mt-0 pt-0"
                  label="水电"
                  color="blue"
                  value="electricity"
                  v-model="dialogDataDetailPrint.type_request"
                  hide-details
                >
                </v-checkbox>
              </v-col>

              <v-col
                cols="2"
                class="d-flex flex-column align-center justify-center"
                style="line-height: 10px"
              >
                <div class="text-center">Tu bổ công trình</div>
                <v-checkbox
                  class="mt-0 pt-0"
                  label="工程修缮"
                  color="blue"
                  value="renovation"
                  v-model="dialogDataDetailPrint.type_request"
                  hide-details
                >
                </v-checkbox>
              </v-col>

              <v-col
                cols="2"
                class="d-flex flex-column align-center justify-center"
                style="line-height: 10px"
              >
                <div class="text-center">Khác</div>
                <v-checkbox
                  class="mt-0 pt-0"
                  label="其他"
                  color="blue"
                  value="other"
                  v-model="dialogDataDetailPrint.type_request"
                  hide-details
                >
                </v-checkbox>
              </v-col>
            </v-row>
          </td>
        </tr>

        <!-- hạng mục -->
        <tr class="textMid">
          <td
            class="pl-1 py-0 pr-0"
            style="vertical-align: middle; text-align: left; line-height: 13px"
          >
            Tên hạng mục <br />
            项目名称
          </td>
          <td
            colspan="5"
            style="
              vertical-align: middle;
              text-align: left;
              line-height: 12px;
              padding: 0px 0px 0px 5px;
              white-space: pre-wrap;
              word-break: break-word;
            "
          >
            {{
              dialogDataDetailPrint &&
              dialogDataDetailPrint.category &&
              dialogDataDetailPrint.category.vi
                ? dialogDataDetailPrint.category.vi
                : ""
            }}
            {{
              dialogDataDetailPrint &&
              dialogDataDetailPrint.category &&
              dialogDataDetailPrint.category.en
                ? dialogDataDetailPrint.category.en
                : ""
            }}
            {{
              dialogDataDetailPrint &&
              dialogDataDetailPrint.category &&
              dialogDataDetailPrint.category.cn
                ? dialogDataDetailPrint.category.cn
                : ""
            }}
          </td>
        </tr>
        <!-- nguyên nhân sự cố -->
        <tr class="textMid">
          <td
            class="pl-1 py-0 pr-0"
            style="vertical-align: middle; text-align: left; line-height: 13px"
          >
            Nguyên nhân sự cố <br />
            故障原因 <br>
            Sữa chữakiến nghị <br>
            建議事項
          </td>
          <td
            colspan="5"
            style="
              vertical-align: middle;
              text-align: left;
              line-height: 12px;
              padding: 0px 0px 0px 5px;
              white-space: pre-wrap;
              word-break: break-word;
            "
          >
            {{
              dialogDataDetailPrint &&
              dialogDataDetailPrint.problem &&
              dialogDataDetailPrint.problem.vi
                ? dialogDataDetailPrint.problem.vi
                : ""
            }}
            {{
              dialogDataDetailPrint &&
              dialogDataDetailPrint.problem &&
              dialogDataDetailPrint.problem.en
                ? dialogDataDetailPrint.problem.en
                : ""
            }}
            {{
              dialogDataDetailPrint &&
              dialogDataDetailPrint.problem &&
              dialogDataDetailPrint.problem.cn
                ? dialogDataDetailPrint.problem.cn
                : ""
            }}
          </td>
        </tr>
        <!-- Phương thức tu sửa -->
        <tr class="textMid">
          <td
            class="pl-1 py-0 pr-0"
            style="vertical-align: middle; text-align: left; line-height: 13px"
          >
            Phương thức tu sữa <br />
            维修方式
          </td>
          <td colspan="3" class="py-0" style="vertical-align: middle">
            <v-row>
              <v-col
                cols="4"
                class="d-flex flex-column align-center justify-center"
                style="line-height: 12px"
              >
                <div class="text-center">Nội bộ</div>
                <v-checkbox
                  class="mt-0 pt-0"
                  label="内部维修"
                  color="blue"
                  value="internal"
                  v-model="dialogDataDetailPrint.repair_type"
                  hide-details
                >
                </v-checkbox>
              </v-col>

              <v-col
                cols="4"
                class="d-flex flex-column align-center justify-center"
                style="line-height: 12px"
              >
                <div class="text-center">Bên ngoài</div>
                <v-checkbox
                  class="mt-0 pt-0"
                  label="委外维修"
                  color="blue"
                  value="external"
                  v-model="dialogDataDetailPrint.repair_type"
                  hide-details
                >
                </v-checkbox>
              </v-col>

              <v-col
                cols="4"
                class="d-flex flex-column align-center justify-center"
                style="line-height: 12px"
              >
                <div class="text-center">Khác</div>
                <v-checkbox
                  class="mt-0 pt-0"
                  label="其他"
                  color="blue"
                  value="other"
                  v-model="dialogDataDetailPrint.repair_type"
                  hide-details
                >
                </v-checkbox>
              </v-col>
            </v-row>
          </td>
          <td
            class="pl-1 py-0 pr-0"
            style="vertical-align: middle; line-height: 13px"
          >
            Ngày cần <br />
            需求日期
          </td>
          <td class="pl-1 py-0 pr-0" style="vertical-align: middle">
            {{
              dialogDataDetailPrint && dialogDataDetailPrint.date_need
                ? dialogDataDetailPrint.date_need
                : ""
            }}
          </td>
        </tr>
        <tr class="textMid">
          <td
            class="pl-1 py-0 pr-0"
            style="vertical-align: middle; text-align: left; line-height: 13px"
          >
            kết quả xử lý <br />
            处理结果
          </td>
          <td
            colspan="3"
            style="
              vertical-align: middle;
              line-height: 13px;
              padding: 3px 16px 1px 16px;
            "
          >
            {{
              dialogDataDetailPrint &&
              dialogDataDetailPrint.staff_ga_confirm &&
              dialogDataDetailPrint.staff_ga_confirm.length > 0
                ? dialogDataDetailPrint.staff_ga_confirm[
                    dialogDataDetailPrint.staff_ga_confirm.length - 1
                  ].empno
                : ""
            }}
            -
            {{
              dialogDataDetailPrint &&
              dialogDataDetailPrint.staff_ga_confirm &&
              dialogDataDetailPrint.staff_ga_confirm.length > 0
                ? dialogDataDetailPrint.staff_ga_confirm[
                    dialogDataDetailPrint.staff_ga_confirm.length - 1
                  ].name
                : ""
            }}
            -
            {{
              dialogDataDetailPrint &&
              dialogDataDetailPrint.staff_ga_confirm &&
              dialogDataDetailPrint.staff_ga_confirm.length > 0
                ? dialogDataDetailPrint.staff_ga_confirm[
                    dialogDataDetailPrint.staff_ga_confirm.length - 1
                  ].time.split(',')[0]
                : ""
            }}
            <br />
            {{
              dialogDataDetailPrint &&
              dialogDataDetailPrint.staff_ga_confirm &&
              dialogDataDetailPrint.staff_ga_confirm.length > 0
                ? dialogDataDetailPrint.staff_ga_confirm[
                    dialogDataDetailPrint.staff_ga_confirm.length - 1
                  ].comment
                : ""
            }}
          </td>
          <td
            class="pl-1 py-0 pr-0"
            style="vertical-align: middle; line-height: 13px"
          >
            Nghiệm thu <br />
            验收签名
          </td>
          <td
            class="pl-1 py-0 pr-0"
            style="vertical-align: middle; line-height: 13px"
          >
            {{
              dialogDataDetailPrint.completed_logs &&
              dialogDataDetailPrint.completed_logs.length > 0
                ? dialogDataDetailPrint.completed_logs[
                    dialogDataDetailPrint.completed_logs.length - 1
                  ].empno
                : ""
            }}
            -
            {{
              dialogDataDetailPrint.completed_logs &&
              dialogDataDetailPrint.completed_logs.length > 0
                ? dialogDataDetailPrint.completed_logs[
                    dialogDataDetailPrint.completed_logs.length - 1
                  ].name
                : ""
            }}
            <br />
            {{
              dialogDataDetailPrint.completed_logs &&
              dialogDataDetailPrint.completed_logs.length > 0
                ? dialogDataDetailPrint.completed_logs[
                    dialogDataDetailPrint.completed_logs.length - 1
                  ].time.split(',')[0]
                : ""
            }}
          </td>
        </tr>
        <!-- ghi chú -->
        <tr class="textMid">
          <td
            class="pl-1 py-0 pr-0"
            style="vertical-align: middle; text-align: left; line-height: 13px"
          >
            Ghi chú <br />
            備註
          </td>
          <td
            colspan="5"
            style="
              vertical-align: middle;
              text-align: left;
              line-height: 12px;
              padding: 0px 0px 0px 5px;
              white-space: pre-wrap;
              word-break: break-word;
            "
          >
           
          </td>
        </tr>
      </table>

      <v-row>
        <v-col cols="3" class="text-center text-sign pt-2 pb-1">
          <b>Bộ Phận Tổng Vụ</b> <br /> 
          總務部 <br />
          <p style="line-height: 12px; margin-bottom: 5px">
            {{
              dialogDataDetailPrint && dialogDataDetailPrint.ga_manager_logs
                ? dialogDataDetailPrint.ga_manager_logs.empno
                : ""
            }}
            <br />
            {{
              dialogDataDetailPrint && dialogDataDetailPrint.ga_manager_logs
                ? dialogDataDetailPrint.ga_manager_logs.name
                : ""
            }}
            <br />
            {{
              dialogDataDetailPrint && dialogDataDetailPrint.ga_manager_logs
                ? dialogDataDetailPrint.ga_manager_logs.time.split(',')[0]
                : ""
            }}
          </p>
        </v-col>

        <v-col cols="3" class="text-center text-sign pt-2 pb-1">
          <b>Chủ quản cấp sở</b> <br />
          申請處級主管 <br />
          <p style="line-height: 12px; margin-bottom: 5px">
            {{
              dialogDataDetailPrint &&
              dialogDataDetailPrint.division_manager_logs
                ? dialogDataDetailPrint.division_manager_logs.empno
                : ""
            }}
            <br />
            {{
              dialogDataDetailPrint &&
              dialogDataDetailPrint.division_manager_logs
                ? dialogDataDetailPrint.division_manager_logs.name
                : ""
            }}
            <br />
            {{
              dialogDataDetailPrint &&
              dialogDataDetailPrint.division_manager_logs
                ? dialogDataDetailPrint.division_manager_logs.time.split(',')[0]
                : ""
            }}
          </p>
        </v-col>

        <v-col cols="3" class="text-center text-sign pt-2 pb-1">
          <b>Chủ quản đơn vị</b> <br />
          申請部級主管 <br />
          <p style="line-height: 12px; margin-bottom: 5px">
            {{
              dialogDataDetailPrint && dialogDataDetailPrint.dept_manager_logs
                ? dialogDataDetailPrint.dept_manager_logs.empno
                : ""
            }}
            <br />
            {{
              dialogDataDetailPrint && dialogDataDetailPrint.dept_manager_logs
                ? dialogDataDetailPrint.dept_manager_logs.name
                : ""
            }}
            <br />
            {{
              dialogDataDetailPrint && dialogDataDetailPrint.dept_manager_logs
                ? dialogDataDetailPrint.dept_manager_logs.time.split(',')[0]
                : ""
            }}
          </p>
        </v-col>

        <v-col cols="3" class="text-center text-sign pt-2 pb-1">
          <b>Người đề nghị</b> <br />
          申請人 <br />
          <p style="line-height: 12px; margin-bottom: 5px">
            {{
              dialogDataDetailPrint && dialogDataDetailPrint.submitter
                ? dialogDataDetailPrint.submitter.empno
                : ""
            }}
            <br />
            {{
              dialogDataDetailPrint && dialogDataDetailPrint.submitter
                ? formatName(dialogDataDetailPrint.submitter.name)
                : ""
            }}
            <br />
            {{
              dialogDataDetailPrint && dialogDataDetailPrint.created_at
                ? dialogDataDetailPrint.created_at.split(' ')[0]
                : ""
            }}
          </p>
        </v-col>
        <v-col cols="12" class="pt-0">
          <p class="text-left" style="font-size: 11px; padding-left: 5px">
            <b>Chú ý:</b> Đơn vị đề nghị → Chủ quản đơn vị đề nghị → Chủ quản
            cấp sở đơn vị đề nghị → bộ phận tổng vụ
            <br />
            <b> 注意:</b> 申請人 → 申請部級主管 → 申請處級主管 → 總務部 <br />
            
          </p>
        </v-col>
      </v-row>
    </v-col>
</template>

<script>
import dayjs, { Dayjs } from "dayjs";
import auth from "~/components/auth";
export default {
  name: "PrintContent",
  props: {
    dialogDataDetailPrint: Object,
    hrForeignArr: Array,
  },
  data() {
    return {
      declineDialog: false,

      api: "http://gmo021.cansportsvg.com/api/rpa/",
      activeUser: {},
      dataUrl: null,
    };
  },
  methods: {
    formatName(name) {
      return name
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    },
  },
  computed: {},
  watch: {},
  mounted() {},
};
</script>
<style scoped>
/* css cả trang font-family: times new roman */
body {
  font-family: "Times New Roman", Times, serif !important;
}

.print-layout,
.print-layout table,
.print-layout td,
.print-layout th {
  font-family: "Times New Roman", Times, serif !important;
}

.v-application {
  line-height: 1.2;
}

* {
  padding: 0px;
  margin: 0px;
}

.text-header_title {
  max-width: 15%;
  font-size: 18px !important;
  font-family: "Times New Roman", Times, serif !important;
  padding: 0px !important;
}

.text-header {
  font-size: 12px !important;
  padding: 0px !important;
}

.colum3 {
  padding: 0px !important;
  line-height: 13px;
}

.table tr td,
.table tr th {
  page-break-inside: avoid;
  border-top: 2;
}

.avoid {
  page-break-inside: avoid !important;
  margin: 4px 0 4px 0;
}

.table-condensed > tbody > tr > td,
.table-condensed > tbody > tr > th,
.table-condensed > tfoot > tr > td,
.table-condensed > tfoot > tr > th,
.table-condensed > thead > tr > td,
.table-condensed > thead > tr > th {
  text-align: center;
  z-index: 1;
  cursor: pointer;
}

.table {
  width: 100vw;
  margin-bottom: 1rem;
  background-color: transparent;
  border-collapse: collapse !important;
}

.table td,
.table th {
  text-align: center;
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid black;
  background-color: transparent !important;
}

.table thead th {
  vertical-align: bottom;
  border-bottom: 2px solid #333;
}

.table tbody + tbody {
  border-top: 2px solid #333;
}

.table-bordered td,
.table-bordered th {
  border: 1px solid #333;
}

.align-middle {
  vertical-align: middle !important;
}

tr.textMid td {
  font-size: 12px !important;
  text-align: mid;
}

#print-content {
  display: none;
}

@media print {
  .noPrint {
    display: none;
  }

  #print-content {
    display: none;
  }
}

.text-sign {
  font-size: 12px;
}

</style>
<i18n>
                            {
                              "en":{
                                
                              },
                              "vi":{
                                
                              },
                              "cn":{
                                
                              }
                            }
                          </i18n>
