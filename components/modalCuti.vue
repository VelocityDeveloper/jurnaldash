<template>
    <form @submit.prevent="handleSubmit" ref="form" class="mt-[30px] flex flex-col gap-4" >
        <IftaLabel>
            <InputText id="nama" v-model="params.nama" class="w-full" type="text" variant="filled"/>
            <label for="nama">Nama</label>
        </IftaLabel>

        <IftaLabel>
            <DatePicker id="tanggal" v-model="params.tanggal" class="w-full" dateFormat="yy-mm-dd" variant="filled" />
            <label for="tanggal">Tanggal Cuti</label>
        </IftaLabel>

        <IftaLabel>
            <Select v-model="params.jenis" :options="jeniscuti" optionLabel="jenis" optionValue="value" placeholder="Pilih Jenis Cuti" checkmark :highlightOnSelect="false" class="w-full md:w-56" fluid />
            <label for="jenis">Jenis Cuti</label>
        </IftaLabel>

        <IftaLabel>
            <DatePicker id="time" v-model="params.time" class="w-full" dateFormat="H:s" timeOnly variant="filled" />
            <label for="time">Waktu Cuti</label>
        </IftaLabel>

        <IftaLabel>
            <Select id="tipe" v-model="params.tipe" :options="tipecuti" optionLabel="tipe" optionValue="value" placeholder="Pilih Tipe Cuti" checkmark :highlightOnSelect="false" class="w-full md:w-56" fluid />
            <label for="tipe">Tipe Cuti</label>
        </IftaLabel>

        <IftaLabel>
            <InputText id="detail" v-model="params.detail" class="w-full" type="text" variant="filled"/>
            <label for="detail">Detail</label>
        </IftaLabel>
        
        <div>
            <Button label="Simpan" type="submit" class="w-full" />
        </div>
    </form>
</template>

<script lang="ts" setup>
    const client = useSanctumClient()
    const params = ref({} as any)
    const dialogRef = inject('dialogRef') as any
    const emit = defineEmits(['refreshData']);

    const jeniscuti = [
        { jenis: 'Full', value: 'Full' },
        { jenis: 'Jam', value: 'Jam' },
    ];

    const tipecuti = [
        { tipe: 'Belum diganti', value: 'Belum diganti' },
        { tipe: 'Sudah diganti', value: 'Sudah diganti' },
        { tipe: 'Sakit', value: 'Sakit' },
    ];

    onMounted(() => {
        // Ambil data dari dialogRef saat komponen dimuat
        if (dialogRef && dialogRef.value && dialogRef.value.data) {
            params.value = dialogRef.value.data;
        }
    })

    const handleSubmit = async () => {
        try {
        // jika param id ada, maka update data
        if(params.value.id){
            await client(`/api/cuti/${params.value.id}`, {
            method: 'PUT',
            body: params.value,
            })
        } else {
            await client(`/api/cuti`, {
            method: 'POST',
            body: params.value,
            })
        }
        emit('refreshData')
        dialogRef.value.close()
        
        }
        catch (err: any) {
        // console.log(err);
        }
    }
</script>