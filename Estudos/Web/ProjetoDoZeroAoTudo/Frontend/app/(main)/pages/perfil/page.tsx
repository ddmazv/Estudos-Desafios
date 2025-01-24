/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Projeto } from '@/types';
import { PerfilService } from '@/service/PerfilService';

/* @todo Used 'as any' for types here. Will fix in next version due to onSelectionChange event type issue. */
const Perfil = () => {
    let emptyPerfil: Projeto.Perfil = {
        id: 0,
        descri: ''
    };

    const [Perfis, setPerfis] = useState<Projeto.Perfil[] | null>(null);
    const [PerfilDialog, setPerfilDialog] = useState(false);
    const [deletePerfilDialog, setDeletePerfilDialog] = useState(false);
    const [deletePerfisDialog, setDeletePerfisDialog] = useState(false);
    const [Perfil, setPerfil] = useState<Projeto.Perfil>(emptyPerfil);
    const [selectedPerfis, setSelectedPerfis] = useState<Projeto.Perfil[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);
    const perfisService = useMemo(() => new PerfilService(), []);


    useEffect(() => {
        if(!Perfis){
        perfisService.listarTodos()
            .then((response) => {
                console.log(response.data);
                setPerfis(response.data);
            }).catch((error) => {
                console.log(error);
            })
        }
    }, [perfisService,Perfis]);


    const openNew = () => {
        setPerfil(emptyPerfil);
        setSubmitted(false);
        setPerfilDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setPerfilDialog(false);
    };

    const hideDeletePerfilDialog = () => {
        setDeletePerfilDialog(false);
    };

    const hideDeletePerfisDialog = () => {
        setDeletePerfisDialog(false);
    };

    const savePerfil = () => {
        setSubmitted(true);

        if (!Perfil.id) {
            Perfil.id = undefined;
            perfisService.inserir(Perfil).then((response) => {
                setPerfilDialog(false);
                setPerfil(emptyPerfil);
                setPerfis(null);
                toast.current?.show({
                    severity: "info",
                    summary: "Sucesso!",
                    detail: "Perfil cadastrado com sucesso!"
                });
            }).catch((error) => {   
                console.log(error)
                toast.current?.show({
                    severity: "error",
                    summary: "Erro!",
                    detail: "Erro ao salvar"
                });

            })
        } else {
           perfisService.alterar(Perfil).then((response) => {
            setPerfilDialog(false);
                setPerfil(emptyPerfil);   
                setPerfis([]);
                toast.current?.show({
                    severity: "info",
                    summary: "Sucesso!",
                    detail: "Perfil alterado com sucesso!"
                });
           }).catch((error) =>{
            console.log(error)
            toast.current?.show({
                severity: "error",
                summary: "Erro!",
                detail: "Erro ao alterar"
            });

           })

        }
    };

    const editPerfil = (Perfil: Projeto.Perfil) => {
        setPerfil({ ...Perfil });
        setPerfilDialog(true);
    };

    const confirmDeletePerfil = (Perfil: Projeto.Perfil) => {
        setPerfil(Perfil);
        setDeletePerfilDialog(true);
    };

    const deletePerfil = () => {
       if(Perfil.id){
        perfisService.excluir(Perfil.id).then((response) =>{
            setDeletePerfilDialog(false);
            setPerfil(emptyPerfil);
            setPerfis([]);
            toast.current?.show({
                severity: 'info',
                summary: 'Sucesso',
                detail: 'Perfil excluido com sucesso',
                life: 3000
            });

        }).catch((error)=>{
            toast.current?.show({
                severity: 'error',
                summary: 'Erro!',
                detail: 'Erro ao excluir Perfil',
                life: 3000
            });
        });
       }
       
    };

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    };

    const exportCSV = () => {
        dt.current?.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeletePerfisDialog(true);
    };

    const deleteSelectedPerfis = () => {
       Promise.all(selectedPerfis.map(async(_Perfil) => {
            if(_Perfil.id){
            await perfisService.excluir(_Perfil.id);
        }
        })).then((response) =>{
            setPerfis([]);    
            setSelectedPerfis([]);
            setDeletePerfisDialog(false);
            toast.current?.show({
                severity: 'info',
                summary: 'Sucesso',
                detail: 'Perfis excluidos com sucesso',
                life: 3000
            });
        }).catch((error) =>{
            toast.current?.show({
                severity: 'error',
                summary: 'Erro',
                detail: 'Erro oa excluir Perfis',
                life: 3000
            });
        })

    };
    
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
       /* const val = (e.target && e.target.value) || '';
        let _Perfil = { ...Perfil };
          _Perfil[`${name}`] = val;
        setPerfil(_Perfil);
        */
       setPerfil(prevPerfil => ({
        ...prevPerfil,
        [name]: val,
       }));
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="New" icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew} />
                    <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedPerfis || !(selectedPerfis as any).length} />
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} chooseLabel="Import" className="mr-2 inline-block" />
                <Button label="Export" icon="pi pi-upload" severity="help" onClick={exportCSV} />
            </React.Fragment>
        );
    };

    const idBodyTemplate = (rowData: Projeto.Perfil) => {
        return (
            <>
                <span className="p-column-title">Código</span>
                {rowData.id}
            </>
        );
    };

  

    const descBodyTemplate = (rowData: Projeto.Perfil) => {
        return (
            <>
                <span className="p-column-title">descrição</span>
                {rowData.descri}
            </>
        );
    };

 


    const actionBodyTemplate = (rowData: Projeto.Perfil) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => editPerfil(rowData)} />
                <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDeletePerfil(rowData)} />
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Gerenciamento de Perfis</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const PerfilDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Salvar" icon="pi pi-check" text onClick={savePerfil} />
        </>
    );
    const deletePerfilDialogFooter = (
        <>
            <Button label="Não" icon="pi pi-times" text onClick={hideDeletePerfilDialog} />
            <Button label="Sim" icon="pi pi-check" text onClick={deletePerfil} />
        </>
    );
    const deletePerfisDialogFooter = (
        <>
            <Button label="Não" icon="pi pi-times" text onClick={hideDeletePerfisDialog} />
            <Button label="Sim" icon="pi pi-check" text onClick={deleteSelectedPerfis} />
        </>
    );

    return (
        <div className="grid crud-Projeto">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable
                        ref={dt}
                        value={Perfis}
                        selection={selectedPerfis}
                        onSelectionChange={(e) => setSelectedPerfis(e.value as any)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando {first} até {last} de {totalRecords} Perfis"
                        globalFilter={globalFilter}
                        emptyMessage="Nenhum Perfil encontrado."
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                        <Column field="id" header="Código" sortable body={idBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="chave" header="chave" sortable body={descBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        


                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>o

                    <Dialog visible={PerfilDialog} style={{ width: '450px' }} header="Detalhes de Perfil" modal className="p-fluid" footer={PerfilDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="descri">Descrição</label>
                            <InputText
                                id="descri"
                                value={Perfil.descri}
                                onChange={(e) => onInputChange(e, 'descri')}
                                required
                                autoFocus
                                className={classNames({
                                    'p-invalid': submitted && !Perfil.descri
                                })}
                            />
                            {submitted && !Perfil.descri && <small className="p-invalid">a descrição é obrigatoria.</small>}
                        </div>
                        
                    </Dialog>

                    <Dialog visible={deletePerfilDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deletePerfilDialogFooter} onHide={hideDeletePerfilDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {Perfil && (
                                <span>
                                    Você realmete deseja excluir o Perfil <b>{Perfil.descri}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deletePerfisDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deletePerfisDialogFooter} onHide={hideDeletePerfisDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {Perfil && <span>Você realmete deseja excluir os Perfis selecionados?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default Perfil;
