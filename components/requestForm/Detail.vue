<template>
  <v-row>
    <v-col cols="12" class="noPrint">
      <v-card class="noPrint">
        <v-toolbar dense color="teal">
          <v-btn
          @click="closeDialogDetailRegistration()"
          nuxt
          small
          class="mr-2"
          color="orange"
          dark
          >
          <v-icon>mdi-keyboard-backspace</v-icon>
        </v-btn>
        <v-toolbar-title class="white--text">
          {{ $t("Detailed registration information") }} ( ID:
          {{ combinedDialogData.id }} )
        </v-toolbar-title>
        <v-spacer />
        <div>
          <v-btn class="white--text" @click="locale('vi')" text>VI</v-btn>
          <v-btn class="white--text" @click="locale('en')" text>EN</v-btn>
          <v-btn class="white--text" @click="locale('cn')" text>中文</v-btn>
        </div>
        <br />
      </v-toolbar>
    </v-card>
  </v-col>
  
  <v-col
  v-if="
  combinedDialogData &&
  combinedDialogData.submitter &&
  combinedDialogData.submitter.empno
  "
  cols="12"
  class="pt-0 noPrint"
  >
  <VfaAppFlow
  v-if="activeUser && activeUser.empno"
  v-show="true"
  ref="AppFlow"
  appCode="vg-transport"
  :empno="combinedDialogData.submitter.empno"
  location="vg"
  ></VfaAppFlow>
  <v-card class="pa-3 noPrint">
    <v-row>
      <v-col cols="3" v-if="activeUser && activeUser.empno">
        <h3 class="mb-2">{{ $t("Submitter") }}:</h3>
        <div class="d-flex">
          <v-text-field
          hide-details=""
          class="mr-2 mb-3"
          readonly
          dense
          :label="$t('Empno')"
          :value="
          combinedDialogData && combinedDialogData.submitter
          ? combinedDialogData.submitter.empno
          : ''
          "
          outlined
          ></v-text-field>
          <v-text-field
          hide-details=""
          readonly
          dense
          :label="$t('Name')"
          :value="
          combinedDialogData && combinedDialogData.submitter
          ? combinedDialogData.submitter.name
          : ''
          "
          outlined
          ></v-text-field>
        </div>
        <div class="d-flex">
          <v-text-field
          class="mr-2 mb-3"
          hide-details=""
          readonly
          dense
          :label="$t('Department')"
          :value="
          combinedDialogData && combinedDialogData.submitter
          ? combinedDialogData.submitter.dept
          : ''
          "
          outlined
          ></v-text-field>
          <v-text-field
          hide-details=""
          readonly
          dense
          :label="$t('Division')"
          :value="
          combinedDialogData && combinedDialogData.submitter
          ? combinedDialogData.submitter.high_dept
          : ''
          "
          outlined
          ></v-text-field>
        </div>
        
        <div class="d-flex">
          <v-text-field
          readonly
          hide-details=""
          class="mr-2 pb-3"
          dense
          :label="$t('Date Request')"
          :value="
          combinedDialogData && combinedDialogData.date_request
          ? combinedDialogData.date_request.split(' ')[0]
          : ''
          "
          outlined
          ></v-text-field>
          <v-text-field
          readonly
          hide-details=""
          dense
          :label="$t('Date Need')"
          :value="
          combinedDialogData && combinedDialogData.date_need
          ? combinedDialogData.date_need.split(' ')[0]
          : ''
          "
          outlined
          ></v-text-field>
        </div>
        
        <div class="d-flex">
          <v-text-field
          hide-details=""
          readonly
          dense
          class="mr-2 mb-3"
          :label="$t('Extension no')"
          :value="
          combinedDialogData &&
          combinedDialogData.submitter &&
          combinedDialogData.submitter.ext_no
          ? combinedDialogData.submitter.ext_no
          : ''
          "
          outlined
          ></v-text-field>
          <v-text-field
          hide-details=""
          readonly
          dense
          :label="$t('Type Request')"
          :value="
          combinedDialogData && combinedDialogData.type_request
          ? combinedDialogData.type_request
          : ''
          "
          outlined
          ></v-text-field>
        </div>
        
        <div class="d-flex">
          <v-text-field
          hide-details=""
          readonly
          dense
          class="mr-2 mb-3"
          :label="$t('Area')"
          :value="
          combinedDialogData && combinedDialogData.area
          ? combinedDialogData.area
          : ''
          "
          outlined
          ></v-text-field>
          <v-text-field
          hide-details=""
          readonly
          dense
          :label="$t('Location')"
          :value="
          combinedDialogData && combinedDialogData.location
          ? combinedDialogData.location
          : ''
          "
          outlined
          ></v-text-field>
        </div>
        
        <div
        class="d-flex"
        v-if="
        combinedDialogData &&
        combinedDialogData.status !== 'waiting_ga' &&
        combinedDialogData.status !== 'waiting_dept' &&
        combinedDialogData.status !== 'waiting_division'
        "
        >
        <v-text-field
        hide-details=""
        class="mr-2 mb-2"
        readonly
        dense
        :label="$t('Type Repair')"
        :value="
        combinedDialogData && combinedDialogData.repair_type
        ? combinedDialogData.repair_type
        : ''
        "
        outlined
        ></v-text-field>
        
        <v-text-field
        hide-details=""
        readonly
        dense
        :label="$t('Quote (USD)')"
        :value="
        combinedDialogData && combinedDialogData.quote
        ? combinedDialogData.quote
        : ''
        "
        outlined
        ></v-text-field>
      </div>
      
      <v-card
      v-if="combinedDialogData.status === 'waiting_ga' && isManagerGa"
      class="px-4 pt-1"
      style="max-height: 250px; overflow-y: auto"
      >
      <v-card-title class="pa-0 mb-0" :title="$t('Select repair type')"
      >{{ $t("Select repair type") }}:</v-card-title
      >
      <div class="d-flex" style="justify-content: space-around">
        <v-radio-group v-model="selected_repair_type">
          <v-row>
            <v-col
            v-for="item in repairType"
            :key="item.id"
            cols="6"
            class="py-1"
            >
            <v-radio :value="item.value">
              <template v-slot:label>
                <span>{{ $t(item.text) }}</span>
              </template>
            </v-radio>
          </v-col>
        </v-row>
      </v-radio-group>
      <v-text-field
      style="max-width: 100px; margin-left: 20px"
      v-if="selected_repair_type === 'external'"
      dense
      hide-details=""
      :label="$t('USD')"
      v-model="externalValue"
      outlined
      ></v-text-field>
    </div>
  </v-card>
  <div class="d-flex" style="justify-content: space-between;">
    <v-btn
    v-if="
    selected_repair_type === 'external' &&
    combinedDialogData.status === 'waiting_ga'
    "
    @click="showDialogUploadQuoteFile(item)"
    color="success"
    dark
    block
    >
    <v-icon left>mdi-upload</v-icon>
    {{ $t("Upload quote file ") }}
  </v-btn>
</div>

<div
v-for="(file, index) in quoteFiles"
:key="index"
v-if="isEmpInStaffGa || isEmpInDataFlow"
class="d-flex align-center my-3"
>
<v-btn
large
color="orange"
class="white--text flex-grow-1"
style="max-width: 100%; min-width: 200px;"
@click="openQuoteFile(file)"

>
<div class="d-flex flex-column">
  <span>
    {{ $t("Show Quote File") }} {{ quoteFiles.length > 1 ? index + 1 : '' }}
  </span>
  <!-- <span class="text-caption">{{ file.split("/").pop() }}</span> -->
  <span
  class="text-caption"
  style="max-width: 222px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: inline-block;"
  :title="file.split('/').pop()"
  >
  {{ truncateQuoteFileName(file.split('/').pop()) }}
</span>
</div>
</v-btn>

<v-icon v-if = "isEmpInDataFlow && combinedDialogData.status === 'waiting_ga'"
class="ml-2"
color="red"
title="Delete quote file"
@click.stop="deleteQuoteFileName(file)"
>
mdi-delete
</v-icon>
</div>

<v-card v-if="attachedFile && attachedFile.length > 0" outlined class="mt-1 noPrint">
  <v-card-title class="pl-1 py-1 text-h6 font-weight-bold">
    {{ $t("List of attachments") }}:
    {{ attachedFile ? attachedFile.length : "" }}
  </v-card-title>
  
  <v-card-text style="max-height: 150px; overflow-y: auto">
    <v-list
    class="my-0 py-0"
    v-if="attachedFile && attachedFile.length > 0"
    >
    <v-list-item-group>
      <v-list-item
      v-for="(file, index) in attachedFile"
      :key="index"
      :style="{
        borderBottom:
        index !== attachedFile.length - 1
        ? '3px dotted #e0e0e0'
        : 'none',
        paddingBottom: '1px',
        paddingTop: '5px',
      }"
      >
      <v-list-item-content class="my-0 py-0">
        <v-list-item-title>
          <a
          style="font-size: 18px; line-height: 35px"
          :href="file"
          target="_blank"
          >
          {{ file.split("/").pop() }}
        </a>
      </v-list-item-title>
    </v-list-item-content>
    <v-list-item-action class="my-0 py-0">
      <v-btn
      @click="downloadFile(file)"
      icon
      title="Download this file"
      >
      <v-icon style="color: blue">mdi-download</v-icon>
    </v-btn>
  </v-list-item-action>
</v-list-item>
</v-list-item-group>
</v-list>
</v-card-text>
</v-card>

<!-- <div
v-if="combinedDialogData && combinedDialogData.submitter"
class="d-flex"
>

<v-btn
v-if="
combinedDialogData.status === 'processed' && isEmpInDataDeptFlow
"
large
color="error"
class="white--text mt-3 mr-3"
block
@click="showDialogDenyReq()"
>
{{ $t("Confirm Not Completed") }}
</v-btn>

<v-btn
v-if="
combinedDialogData.status === 'processed' && isEmpInDataDeptFlow
"
large
color="teal"
class="white--text mt-3"
block
@click="showDialogApproveReq()"
>
{{ $t("Confirm Completed") }}
</v-btn>
</div> -->

<v-btn
v-if="combinedDialogData.status === 'processing' && isEmpInStaffGa"
large
color="teal"
class="white--text mt-3"
block
@click="showDialogApproveReq()"
>
{{ $t("Confirm Processed") }}
</v-btn>

<v-btn
v-if="isEmpInStaffGa || activeUser.empno == '41638'"
large
color="orange"
class="white--text mt-3"
block
@click="openCompPrint(combinedDialogData)"
>
<v-icon left>mdi-printer</v-icon>
{{ $t("Print") }}
</v-btn>
</v-col>
<v-col cols="9">
  <v-card class="px-4 py-2 noPrint">
    <v-card-title class="pa-0 mb-0" :title="$t('Category Name')">{{
      $t("Category Name:")
    }}</v-card-title>
    <!-- category name -->
    <div class="d-flex mb-3">
      <v-text-field
      readonly
      dense
      hide-details=""
      :label="$t('Category VI')"
      :value="
      combinedDialogData &&
      combinedDialogData.category &&
      combinedDialogData.category.vi
      ? combinedDialogData.category.vi
      : ''
      "
      outlined
      ></v-text-field>
      <v-text-field
      class="mx-3"
      readonly
      dense
      hide-details=""
      :label="$t('Category EN')"
      :value="
      combinedDialogData &&
      combinedDialogData.category &&
      combinedDialogData.category.en
      ? combinedDialogData.category.en
      : ''
      "
      outlined
      ></v-text-field>
      <v-text-field
      readonly
      dense
      hide-details=""
      :label="$t('Category CN')"
      :value="
      combinedDialogData &&
      combinedDialogData.category &&
      combinedDialogData.category.cn
      ? combinedDialogData.category.cn
      : ''
      "
      outlined
      ></v-text-field>
    </div>
    <v-row>
      <v-col cols="6">
        <v-card-title class="pa-0 mb-0" :title="$t('Asset code')">{{
          $t("Asset code")
        }}</v-card-title>
        <div class="mb-3">
          <v-textarea
          rows="9"
          readonly
          dense
          hide-details=""
          :value="
          combinedDialogData && combinedDialogData.asset_code
          ? combinedDialogData.asset_code
          : ''
          "
          :label="$t('Asset code')"
          outlined
          ></v-textarea>
        </div>
      </v-col>
      <v-col cols="6">
        <!-- Cause of the problem -->
        <v-card-title
        class="pa-0 mb-0"
        :title="$t('Cause of the problem')"
        >
        {{ $t("Cause of the problem:") }}
      </v-card-title>
      
      <v-tabs v-model="activeTab" background-color="teal" color="yellow" grow dark>
        <!-- Tabs -->
        <v-tab>{{ $t("Problem EN") }}</v-tab>
        <v-tab>{{ $t("Problem VI") }}</v-tab>
        <v-tab>{{ $t("Problem CN") }}</v-tab>
        
        <!-- Tab Items -->
        
        <v-tab-item>
          <v-textarea
          class="pt-2"
          rows="7"
          readonly
          dense
          hide-details=""
          :label="$t('Problem EN')"
          :value="
          combinedDialogData &&
          combinedDialogData.problem &&
          combinedDialogData.problem.en
          ? combinedDialogData.problem.en
          : ''
          "
          outlined
          ></v-textarea>
        </v-tab-item>
        
        <v-tab-item>
          <v-textarea
          class="pt-2"
          rows="7"
          readonly
          dense
          hide-details=""
          :label="$t('Problem VI')"
          :value="
          combinedDialogData &&
          combinedDialogData.problem &&
          combinedDialogData.problem.vi
          ? combinedDialogData.problem.vi
          : ''
          "
          outlined
          ></v-textarea>
        </v-tab-item>
        
        <v-tab-item>
          <v-textarea
          class="pt-2"
          rows="7"
          readonly
          dense
          hide-details=""
          :label="$t('Problem CN')"
          :value="
          combinedDialogData &&
          combinedDialogData.problem &&
          combinedDialogData.problem.cn
          ? combinedDialogData.problem.cn
          : ''
          "
          outlined
          ></v-textarea>
        </v-tab-item>
      </v-tabs>
    </v-col>
  </v-row>
</v-card>
<v-row>
  <v-btn
  v-if="combinedDialogData.status !== 'processing' && combinedDialogData.status !== 'declined' && combinedDialogData.status !== 'processed' && canApproval()"
  large
  color="error"
  class="ml-5 my-5"
  @click="showDialogDenyReq()"
  >
  {{ $t("Deny") }}
</v-btn>
<v-btn
v-if="
combinedDialogData.status === 'processed' && isEmpInDataDeptFlow
"
large
color="error"
class="white--text ml-5 my-5"
@click="showDialogDenyReq()"
>
{{ $t("Confirm Not Completed") }}
</v-btn>
<v-spacer></v-spacer> 
<v-btn
v-if="combinedDialogData.status !== 'processing' && combinedDialogData.status !== 'declined' && combinedDialogData.status !== 'processed' && canApproval()"
large
color="primary"
class="mr-5 my-5"
@click="showDialogApproveReq()"
>
{{ $t("Approve") }}
</v-btn>
<v-btn
v-if="
combinedDialogData.status === 'processed' && isEmpInDataDeptFlow
"
large
color="teal"
class="white--text mr-5 my-5"
@click="showDialogApproveReq()"
>
{{ $t("Confirm Completed") }}
</v-btn>

</v-row>
</v-col>
</v-row>
<!-- //here confirm Completed-->
<!-- <div
v-if="combinedDialogData && combinedDialogData.submitter"
class="d-flex mt-5"
>

<v-btn
v-if="
combinedDialogData.status === 'processed' && isEmpInDataDeptFlow
"
large
color="error"
class="white--text mt-3 mr-3"
@click="showDialogDenyReq()"
>
{{ $t("Confirm Not Completed") }}
</v-btn>

<v-btn
v-if="
combinedDialogData.status === 'processed' && isEmpInDataDeptFlow
"
large
color="teal"
class="white--text mt-3"
@click="showDialogApproveReq()"
>
{{ $t("Confirm Completed") }}
</v-btn>
</div> -->

</v-card>
</v-col>
<!-- v-if="showPrintContent" -->
<div  id="print-content">
  <RequestFormPrint :dialogDataDetailPrint="combinedDialogData" />
</div>

<v-dialog v-model="uploadQuoteFileDialog" max-width="500px" persistent>
  <v-card>
    <v-card-title class="text-h5">
      {{ $t("Upload Quote File") }}
    </v-card-title>
    <v-card-text class="pb-0">
  <!-- v-file-input ẩn đi -->
  <v-file-input
    ref="fileInput"
    style="display: none"
    truncate-length="50"
    counter
    show-size
    v-model="quotationFiles"
    multiple
    @change="onFileSelected"
  ></v-file-input>

  <!-- Khối chứa để căn giữa -->
  <div style="text-align: center;">
    <v-btn
      color="primary"
      outlined
      @click="$refs.fileInput.$el.querySelector('input').click()"
    >
      {{ $t('Choose Quote File') }}
    </v-btn>

    <!-- Hiển thị tên file đã chọn -->
    <div v-if="quotationFiles && quotationFiles.length" class="mt-2">
      <div
        v-for="(file, index) in quotationFiles"
        :key="index"
        class="text-caption"
        style="text-align: center; font-size:20px !important; margin-bottom: 10px;"
      >
      {{ index + 1 }}. {{ file.name }} ({{ (file.size / 1024).toFixed(2) }} KB)
      </div>
    </div>
  </div>
</v-card-text>
<v-divider></v-divider>
    <v-card-actions>
      <v-btn
      color="primary"
      text
      @click.native="uploadQuoteFileDialog = false"
      >{{ $t("Close") }}</v-btn
      >
      <v-spacer></v-spacer>
      <v-btn
      :disabled="!quotationFiles"
      color="primary"
      text
      @click="uploadQuoteFile()"
      >{{ $t("Upload File") }}</v-btn
      >
    </v-card-actions>
  </v-card>
</v-dialog>

<v-dialog v-model="showFileQuoteFileDialog" fullscreen>
  <v-card>
    <v-toolbar dense dark color="teal">
      <v-btn icon dark @click="dialog = false">
        <v-icon @click="showFileQuoteFileDialog = false"
        >mdi-arrow-left-bold</v-icon
        >
      </v-btn>
    </v-toolbar>
    <v-card-text class="pb-0">
      <embed
      :src="quoteFile"
      type="application/pdf"
      width="100%"
      height="1000px"
      />
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</v-dialog>

<v-dialog v-model="dialogApproveReq" max-width="800px" persistent>
  <v-card>
    <v-toolbar dense color="teal" dark>
      <v-toolbar-title
      title="Approve Request"
      class="d-flex"
      style="align-items: center"
      >
      {{
        combinedDialogData.status === "processing"
        ? $t("Confirm Processed")
        : combinedDialogData.status === "processed"
        ? $t("Confirm Completed")
        : $t("Approve Request")
      }}
    </v-toolbar-title>
    <v-spacer />
  </v-toolbar>
  <v-card-title class="text-h6 font-weight-bold">
    {{ $t("Please provide your comments ( if any )") }}
  </v-card-title>
  
  <v-card-text>
    <v-textarea
    hide-details
    v-model="approvalComment"
    :label="$t('Enter your comment')"
    outlined
    dense
    rows="4"
    clearable
    ></v-textarea>
  </v-card-text>
  
  <v-card-actions>
    <v-btn outlined text color="black" @click="dialogApproveReq = false">
      {{ $t("Close") }}
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn color="teal" class="white--text" @click="approveReq()" :disabled="isApproving" :loading="isApproving">
      {{ $t("Confirm") }}
    </v-btn>
  </v-card-actions>
</v-card>
</v-dialog>
<v-dialog v-model="dialogDeclineReq" max-width="800px" persistent>
  <v-card>
    <v-toolbar dense color="error" dark>
      <v-toolbar-title class="text-h6">
        {{
          combinedDialogData.status === "processed"
          ? $t("Confirm Not Completed")
          : $t("Decline Request")
        }}
      </v-toolbar-title>
    </v-toolbar>
    
    <v-card-title class="text-h6">
      {{ $t("Please input reason for refusal") }}
    </v-card-title>
    <v-card-text class="pb-0">
      <v-textarea
      hide-details
      outlined
      v-model="decline_reason"
      ></v-textarea>
    </v-card-text>
    <v-card-actions>
      <v-btn
      color="blue darken-1"
      outlined
      text
      @click="dialogDeclineReq = false"
      >
      {{ $t("close") }}
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn
    :disabled="!decline_reason"
    color="error"
    @click="declineReq()"
    >
    {{
      combinedDialogData.status === "processed"
      ? $t("Confirm Not Completed")
      : $t("Confirm decline")
    }}
  </v-btn>
</v-card-actions>
</v-card>
</v-dialog>
</v-row>
</template>

<script>
import dayjs, { Dayjs } from "dayjs";
import auth from "~/components/auth";
import VfaAppFlow from "../../../../@global-component/vfa-updated2"; //vfa-app-flow
export default {
  name: "RequestFormSign",
  components: { VfaAppFlow, auth },
  props: {
    dialogDataDetail: Object,
  },
  data() {
    return {
      activeTab: 0,
      quotationFile: null,
      quotationFiles: [],
      dialogDeclineReq: false,
      dialogApproveReq: false,
      decline_reason: null,
      test: false,
      api: "http://gmo021.cansportsvg.com/api/rpa/",
      msgApi: "http://gmo021.cansportsvg.com/api/msg-center/",
      repairType: [
      { text: this.$t("Internal"), value: "internal" },
      { text: this.$t("External"), value: "external" },
      ],
      activeUser: {},
      listEmailDivisonManager: [],
      selected_repair_type: null,
      externalValue: 0,
      uploadQuoteFileDialog: false,
      showFileQuoteFileDialog: false,
      quoteFile: null,
      quoteFiles: [],
      attachedFile: null,
      approvalComment: null,
      listStaffGa: [],
      showPrintContent: false,
      localDialogData: null, // Add this to store local copy of prop
      isApproving: false,
    };
  },
  methods: {
    onFileSelected () {
    // Xử lý thêm nếu cần sau khi chọn file
    console.log("Files selected:", this.quotationFiles);
  },
    truncateQuoteFileName(filename) {
      // Loại bỏ phần tiền tố "RPA_###_" bằng regex
      const cleaned = filename.replace(/^RPA_\d+_/, '');
      
      const maxLength = 25;
      const extIndex = cleaned.lastIndexOf('.');
      
      if (cleaned.length <= maxLength) return cleaned;
      
      if (extIndex > 0) {
        const base = cleaned.substring(0, extIndex);
        const ext = cleaned.substring(extIndex);
        const visibleChars = maxLength - ext.length - 3;
        return base.substring(0, visibleChars) + '...' + ext;
      } else {
        return cleaned.substring(0, maxLength - 3) + '...';
      }
    },
    openQuoteFile(fileUrl) {
      console.log("Opening quote file:", fileUrl);
      window.open(fileUrl, '_blank');
    },
    async deleteQuoteFileName(file) {
      const fileName = file.split('/').pop();
      if (!confirm(`${this.$t("Are you sure you want to delete this file?")}\n${fileName}`)) {
        return;
      }
      let params = {
        id : this.dialogDataDetail.id,
        fileName: fileName,
      };
      this.$axios
      .post(this.api + "deleteQuoteFileName", params)
      .then((res) => {
        if (res.status === 200) {
          this.getDataForId(); // Refresh data after deletion
          this.showMsg("success", "File deleted successfully");
        } else {
          this.showMsg("error", "Failed to delete file");
        }
      })
      .catch((error) => {
        console.log(error);
      });
      console.log('Quote file name:', fileName);
    },
    openCompPrint(item) {
      this.showPrintContent = true;
      this.$nextTick(() => {
        setTimeout(() => {
          window.print();
          this.showPrintContent = false;
        }, 300);
      });
    },
    async downloadFile(fileUrl) {
      try {
        const response = await fetch(fileUrl);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.setAttribute("download", fileUrl.split("/").pop());
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
      } catch (error) {
        console.error("Download failed:", error);
      }
    },
    gaConfirmComplete() {
      if (!confirm(this.$t("Are you sure the confirmation is complete.?"))) {
        return;
      }
      let params = {
        dataReq: this.dialogDataDetail,
      };
      this.$axios
      .post(this.api + "gaConfirmComplete", params)
      .then((res) => {
        this.$emit("closeDialogDetailRegistration");
      })
      .catch((error) => {
        console.log(error);
      });
    },
    async getListStaffGa() {
      await this.$axios.get(this.api + "getListStaffGa").then((res) => {
        if (res.status === 200) {
          this.listStaffGa = res.data;
        } else {
          this.showMsg("error", Error);
        }
      });
    },
    
    async getDataForId() {
      let params = {
        id: this.dialogDataDetail.id,
        area: this.dialogDataDetail.area,
        empno: this.dialogDataDetail.submitter.empno,
        dept: this.dialogDataDetail.dept,
        high_dept: this.dialogDataDetail.high_dept,
      };
      
      await this.$axios
      .post(this.api + "getDataById", params)
      .then((res) => {
        if (res.data) {
          // Xử lý file quotation
          // if (res.data.file_quotation) {
          //   this.quoteFile =
          //   "http://gmo021.cansportsvg.com/api/storage/app/rpa/quote_file/" +
          //   res.data.file_quotation;
          // }
          
          if (res.data.file_quotation) {
            try {
              // Nếu là chuỗi JSON array
              const parsed = JSON.parse(res.data.file_quotation);
              if (Array.isArray(parsed)) {
                this.quoteFiles = parsed.map(file => 
                "http://gmo021.cansportsvg.com/api/storage/app/rpa/quote_file/" + file
                );
              } else {
                // Trường hợp không phải array (fallback)
                this.quoteFiles = [
                "http://gmo021.cansportsvg.com/api/storage/app/rpa/quote_file/" + res.data.file_quotation
                ];
              }
            } catch (e) {
              // Nếu không phải JSON array, giả sử là 1 file duy nhất
              this.quoteFiles = [
              "http://gmo021.cansportsvg.com/api/storage/app/rpa/quote_file/" + res.data.file_quotation
              ];
            }
          }
          
          // Xử lý attachment (đã là mảng từ PHP)
          if (res.data.attachment.length) {
            this.attachedFile = res.data.attachment.map(
            (file) =>
            "http://gmo021.cansportsvg.com/api/storage/app/rpa/attachment/" +
            file
            );
          }
          
          // Gán dataFlow vào biến của component
          this.localDialogData = {
            ...this.dialogDataDetail,
            asset_code: res.data.asset_code,
            dataFlow: res.data.dataFlow || [],
            quote: res.data.quote,
            staff_ga_confirm: res.data.staff_ga_confirm,
            completed_logs: res.data.completed_logs,
            dept_manager_logs:
            res.data.dept_manager_logs,
            division_manager_logs:
            res.data.division_manager_logs,
            ga_manager_logs: res.data.ga_manager_logs,
            division_ga_logs: res.data.division_ga_logs,
            bu_logs: res.data.bu_logs,
          };
        }
      })
      .catch((error) => {
        console.log("getFileData", error);
      });
    },
    
    async openFileQuoteFileDialog() {
      this.showFileQuoteFileDialog = true;
    },
    uploadQuoteFile() {
      if (
      !confirm(
      "Confirm Upload Quote File?\nXác nhận tải lên file báo giá\n確認上傳報價文件"
      )
      )
      return;
      
      let formData = new FormData();
      formData.append("id", this.dialogDataDetail.id);
      
      // Gửi từng file
      this.quotationFiles.forEach((file, index) => {
        formData.append(`files[${index}]`, file);
      });
      
      this.$axios
      .post(this.api + "uploadQuoteFilesNew", formData) //uploadQuoteFiles , uploadQuoteFilesNew
      .then((res) => {
        this.uploadQuoteFileDialog = false;
        this.getDataForId();
      })
      .catch((err) => {
        console.log("uploadQuoteFiles", err);
      });
    },
    uploadQuoteFile__() {
      if (
      !confirm(
      "Confirm Upload Quote File ? \n xác nhận tải lên File báo giá \n 確認上傳報價文件"
      )
      )
      return;
      
      let formData = new FormData();
      formData.append("id", this.dialogDataDetail.id);
      formData.append("file_quotation", this.quotationFile);
      
      this.$axios
      .post(this.api + "uploadQuoteFile", formData)
      .then((res) => {
        this.uploadQuoteFileDialog = false;
      })
      .catch((err) => {
        console.log("uploadQuoteFile", err);
      });
    },
    
    showDialogUploadQuoteFile() {
      this.uploadQuoteFileDialog = true;
    },
    async confirmCompleted() {
      if (
      !confirm(
      this.$t(
      "Confirm this request is complete? \n Xác nhận yêu cầu này đã hoàn thành? \n 确认此请求已完成?"
      )
      )
      ) {
        return;
      }
      let params = {
        dataReq: this.dialogDataDetail,
      };
      await this.$axios
      .post(this.api + "confirmCompleted", params)
      .then((res) => {
        this.$emit("closeDialogDetailRegistration");
      })
      .catch((error) => {
        console.log("confirmCompleted", error);
      });
    },
    async declineReq() {
      const confirmMessage =
      this.dialogDataDetail.status === "processed"
      ? this.$t("Are you sure you want to Confirmation not completed?")
      : this.$t("Are you sure you want to decline this request?");
      
      if (!confirm(confirmMessage)) {
        this.isApproving = false;
        return;
      }
      
      const date = new Date();
      const time = `${date.getFullYear()}-${String(
      date.getMonth() + 1
      ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}, ${String(
      date.getHours()
      ).padStart(2, "0")}:${String(date.getMinutes()).padStart(
      2,
      "0"
      )}:${String(date.getSeconds()).padStart(2, "0")}`;
      
      let params = {
        dataReq: this.dialogDataDetail,
        confirmer: {
          empno: this.activeUser.empno,
          name: this.activeUser.name,
          dept: this.activeUser.dept,
          high_dept: this.activeUser.hight_dept,
          email: this.activeUser.email,
          comment: this.decline_reason,
          time: time,
        },
      };
      await this.$axios.post(this.api + "declineReq", params).then((res) => {
        this.dialogDeclineReq = false;
        this.decline_reason = null;
        this.$emit("closeDialogDetailRegistration");
      });
    },
    async approveReq() {
      if (this.isApproving) return;
      this.isApproving = true;
      if (this.combinedDialogData.status === "waiting_ga") {
        if (!this.selected_repair_type) {
          alert(
          this.$t(
          "You have not selected a repair type \n bạn chưa chọn loại sửa chữa \n 你还没有选择修理类型"
          )
          );
          this.dialogApproveReq = false;
          this.isApproving = false;
          return;
        }
        if (this.selected_repair_type === "external" && !this.externalValue) {
          alert(
          this.$t(
          "You have not entered the USD value \n bạn chưa nhập giá USD \n 你还没有输入USD值"
          )
          );
          this.dialogApproveReq = false;
          this.isApproving = false;
          return;
        }
      }
      
      const confirmMessage =
      this.combinedDialogData.status === "processing"
      ? this.$t("Are you sure you want to confirm this processed?")
      : this.combinedDialogData.status === "processed"
      ? this.$t("Are you sure you want to confirm this completed?")
      : this.$t("Are you sure you want to approve this request?");
      
      if (!confirm(confirmMessage)) {
        return;
      }
      // const time = new Date().toLocaleString();
      const date = new Date();
      const time = `${date.getFullYear()}-${String(
      date.getMonth() + 1
      ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}, ${String(
      date.getHours()
      ).padStart(2, "0")}:${String(date.getMinutes()).padStart(
      2,
      "0"
      )}:${String(date.getSeconds()).padStart(2, "0")}`;
      let params = {
        dataReq: this.combinedDialogData,
        repair_type: this.selected_repair_type,
        quote: this.externalValue
        ? this.externalValue
        : this.combinedDialogData.quote,
        confirmer: {
          empno: this.activeUser.empno,
          name: this.activeUser.name,
          dept: this.activeUser.dept,
          high_dept: this.activeUser.hight_dept,
          email: this.activeUser.email,
          comment: this.approvalComment,
          time: time,
        },
      };
      
      try {
        const res = await this.$axios.post(this.api + "approveReq", params);
        // console.log("listEmailDivisonManager", res.data.listEmailDivisonManager);
        this.dialogApproveReq = false;
        this.$emit("closeDialogDetailRegistration");
        this.isApproving = false;
      } catch (error) {
        console.error("approveReq", error);
        this.isApproving = false;
      }
    },
    canApproval() {
      const statusMapping = {
        waiting_dept: 0,
        waiting_division: 1,
        waiting_ga: 2,
        waiting_division_ga: 3,
        waiting_bu: 4,
        waiting_ceo: 5,
        processing: -1, // Xử lý riêng cho "processing"
      };
      
      const activeEmpno = this.activeUser.empno;
      const flowIndex = statusMapping[this.combinedDialogData.status];
      
      // Nếu trạng thái là "processing", kiểm tra listStaffGa
      if (this.combinedDialogData.status === "processing") {
        const isStaffGa = this.listStaffGa.some(
        (staff) => staff.empno === activeEmpno
        );
        return !isStaffGa; // Nếu có trong listStaffGa, nút Approve sẽ bật
      }
      
      // Nếu trạng thái không khớp với bất kỳ flow nào
      if (flowIndex === undefined) {
        return true;
      }
      
      const managers =
      this.combinedDialogData.dataFlow?.[flowIndex]?.managers || [];
      
      // Kiểm tra nếu activeUser.empno tồn tại trong managers.empno
      const isManager = managers.some(
      (manager) => manager.empno === activeEmpno
      );
      
      // Kiểm tra nếu activeUser.empno tồn tại trong deputies.empno và có status === true
      const isDeputy = managers.some((manager) =>
      manager.deputies?.some(
      (deputy) => deputy.empno === activeEmpno && deputy.status === true
      )
      );
      
      // Nếu activeUser là Manager hoặc Deputy thì nút Approve sẽ được bật
      // console.log("isManager:", isManager, "isDeputy:", isDeputy);
      
      return (isManager || isDeputy);
    },
    
    
    locale(tg) {
      this.$i18n.setLocale(tg);
      $nuxt.$emit("change-locale", tg);
      this.$vuetify.lang.current = tg;
      if (tg === 'en') this.activeTab = 0;
      else if (tg === 'vi') this.activeTab = 1;
      else if (tg === 'cn') this.activeTab = 2;
    },
    closeDialogDetailRegistration() {
      this.combinedDialogData = null;
      this.attachedFile = null;
      this.quoteFile = null;
      this.quoteFiles = null;
      this.approvalComment = null;
      this.localDialogData = null;
      this.selected_repair_type = null;
      this.externalValue = 0;
      this.$emit("closeDialogDetailRegistration");
    },
    showDialogApproveReq() {
      this.dialogApproveReq = true; 
    },
    showDialogDenyReq() {
      this.dialogDeclineReq = true;
    },
  },
  computed: {
    combinedDialogData: {
      get() {
        return this.localDialogData || this.dialogDataDetail;
      },
      set(value) {
        this.localDialogData = value;
      }
    },
    isEmpInStaffGa() {
      const result = this.listStaffGa.some(
      (staff) => staff.empno === this.activeUser.empno
      );
      // console.log("isEmpInStaffGa result:", result);
      return result;
    },
    isManagerGa(){
      if (!this.dialogDataDetail.dataFlow) return false;
      
      const allowedLevels = ["ga_manager"];
      
      return this.dialogDataDetail.dataFlow
      .filter((flow) => allowedLevels.includes(flow.lvl_code))
      .some((flow) => {
        
        return flow.managers.some((manager) => {
          if (manager.empno === this.activeUser.empno) {
            return true;
          }
          return manager.deputies.some(
          (deputy) =>
          deputy.empno === this.activeUser.empno &&
          deputy.status === true
          );
        });
      });
    },
    isEmpInDataFlow() {
      if (!this.combinedDialogData.dataFlow) return false;
      const result = this.combinedDialogData.dataFlow.some((flow) => {
        return flow.managers.some((manager) => {
          if (manager.empno === this.activeUser.empno) {
            return true;
          }
          return manager.deputies.some(
          (deputy) =>
          deputy.empno === this.activeUser.empno && deputy.status === true
          );
        });
      });
      // console.log("isEmpInDataFlow result:", result);
      return result;
    },
    isEmpInDataDeptFlow() {
      if (!this.dialogDataDetail.dataFlow) return false;
      
      const allowedLevels = ["dept_manager", "division_manager", "general_manager"];
      
      return this.dialogDataDetail.dataFlow
      .filter((flow) => allowedLevels.includes(flow.lvl_code))
      .some((flow) => {
        return flow.managers.some((manager) => {
          if (manager.empno === this.activeUser.empno) {
            return true;
          }
          return manager.deputies.some(
          (deputy) =>
          deputy.empno === this.activeUser.empno &&
          deputy.status === true
          );
        });
      });
    },
  },
  watch: {
    dialogDataDetail: {
      immediate: true,
      handler(newVal) {
        if (newVal && newVal.submitter) {
          this.combinedDialogData = {...newVal}; // Use setter
          this.getDataForId();
        }
      },
    },
    '$i18n.locale': function(newLocale) {
      if (newLocale === 'en') this.activeTab = 0;
      else if (newLocale === 'vi') this.activeTab = 1;
      else if (newLocale === 'cn') this.activeTab = 2;
    }
  },
  mounted() {
    this.activeUser = this.$session.get("rpa");
    // this.getDataForId();
    this.getListStaffGa();
  },
};
</script>
<style scoped>
.v-tabs {
  border-bottom: 1px solid #ccc;
}

.v-tab {
  text-transform: uppercase;
  font-weight: bold;
}

#print-content {
  display: none;
}

@media print {
  .noPrint {
    display: none;
  }
  #print-content { 
    display: block;
  }
}
</style>
<i18n>
  {
    "en":{
      "Approve Request": "Approve Request",
      "Confirm Not Completed": "Confirm Not Completed",
      "Confirm Processed": "Confirm Processed",
      "Enter your comment": "Enter your comment",
      "Please provide your comments ( if any )": "Please provide your comments ( if any )",
      "Detailed registration information": "Detailed registration information",
      "Submitter": "Submitter",
      "Empno": "Empno",
      "Name": "Name",
      "Department": "Department",
      "Division": "Division",
      "Date Request": "Date Request",
      "Date Need": "Date Need",
      "Extension no": "Extension no",
      "Type Request": "Type Request",
      "Area": "Area",
      "Location": "Location",
      "Type Repair": "Type Repair",
      "Quote (USD)": "Quote (USD)",
      "Select repair type": "Select repair type",
      "USD": "USD",
      "Upload quote file ": "Upload quote file",
      "Show Quote File": "Show Quote File",
      "List of attachments": "List of attachments",
      "Confirm Completed": "Confirm Completed",
      "Asset code": "Asset code",
      "Category Name:": "Category Name:",
      "Category VI": "Category VI",
      "Category EN": "Category EN",
      "Category CN": "Category CN",
      "Cause of the problem:": "Cause of the problem:",
      "Problem VI": "Problem VI",
      "Problem EN": "Problem EN",
      "Problem CN": "Problem CN",
      "Deny": "Deny",
      "Approve": "Approve",
      "Upload Quote File": "Upload Quote File",
      "Choose Quote file": "Choose Quote file",
      "Close": "Close",
      "Upload File": "Upload File",
      "Confirm": "Confirm"
    },
    "vi":{
      "Approve Request": "Phê duyệt yêu cầu",
      "Confirm Not Completed": "Xác nhận chưa hoàn thành",
      "Confirm Processed": "Xác nhận đã xử lý",
      "Enter your comment": "Nhập ý kiến của bạn",
      "Please provide your comments ( if any )": "Vui lòng cung cấp ý kiến của bạn (nếu có)",
      "Detailed registration information": "Thông tin đăng ký chi tiết",
      "Submitter": "Người gửi",
      "Empno": "Mã nhân viên",
      "Name": "Tên",
      "Department": "Phòng ban",
      "Division": "Bộ phận",
      "Date Request": "Ngày yêu cầu",
      "Date Need": "Ngày cần",
      "Extension no": "Số máy lẻ",
      "Type Request": "Loại yêu cầu",
      "Area": "Khu vực",
      "Location": "Vị trí",
      "Type Repair": "Loại sửa chữa",
      "Quote (USD)": "Báo giá (USD)",
      "Select repair type": "Chọn loại sửa chữa",
      "USD": "USD",
      "Upload quote file ": "Tải lên tệp báo giá",
      "Show Quote File": "Hiển thị tệp báo giá",
      "List of attachments": "Danh sách tệp đính kèm",
      "Confirm Completed": "Xác nhận hoàn thành",
      "Asset code": "Mã tài sản",
      "Category Name:": "Tên danh mục:",
      "Category VI": "Danh mục VI",
      "Category EN": "Danh mục EN",
      "Category CN": "Danh mục CN",
      "Cause of the problem:": "Nguyên nhân của vấn đề:",
      "Problem VI": "Vấn đề VI",
      "Problem EN": "Vấn đề EN",
      "Problem CN": "Vấn đề CN",
      "Deny": "Từ chối",
      "Approve": "Phê duyệt",
      "Upload Quote File": "Tải lên tệp báo giá",
      "Choose Quote file": "Chọn tệp báo giá",
      "Close": "Đóng",
      "Upload File": "Tải tệp lên",
      "Confirm": "Xác nhận"
    },
    "cn":{
      "Approve Request": "批准请求",
      "Confirm Not Completed": "确认未完成",
      "Confirm Processed": "确认已处理",
      "Enter your comment": "输入您的评论",
      "Please provide your comments ( if any )": "请提供您的意见（如果有）",
      "Detailed registration information": "详细注册信息",
      "Submitter": "提交者",
      "Empno": "员工编号",
      "Name": "姓名",
      "Department": "部门",
      "Division": "分部",
      "Date Request": "请求日期",
      "Date Need": "需要日期",
      "Extension no": "分机号",
      "Type Request": "请求类型",
      "Area": "区域",
      "Location": "位置",
      "Type Repair": "维修类型",
      "Quote (USD)": "报价 (USD)",
      "Select repair type": "选择维修类型",
      "USD": "美元",
      "Upload quote file ": "上传报价文件",
      "Show Quote File": "显示报价文件",
      "List of attachments": "附件列表",
      "Confirm Completed": "确认完成",
      "Asset code": "资产代码",
      "Category Name:": "类别名称:",
      "Category VI": "类别 VI",
      "Category EN": "类别 EN",
      "Category CN": "类别 CN",
      "Cause of the problem:": "问题原因:",
      "Problem VI": "问题 VI",
      "Problem EN": "问题 EN",
      "Problem CN": "问题 CN",
      "Deny": "拒绝",
      "Approve": "批准",
      "Upload Quote File": "上传报价文件",
      "Choose Quote file": "选择报价文件",
      "Close": "关闭",
      "Upload File": "上传文件",
      "Confirm": "确认"
    }
  }
</i18n>
