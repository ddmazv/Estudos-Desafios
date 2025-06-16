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
import { RecursoService } from '@/service/RecursoService';

/* @todo Used 'as any' for types here. Will fix in next version due to onSelectionChange event type issue. */
const Recurso = () => {
    let emptyRecurso: Projeto.Recurso = {
        id: 0,
        nome: '',
        chave: ''
    };

    const [Recursos, setRecursos] = useState<Projeto.Recurso[] | null>(null);
    const [RecursoDialog, setRecursoDialog] = useState(false);
    const [deleteRecursoDialog, setDeleteRecursoDialog] = useState(false);
    const [deleteRecursosDialog, setDeleteRecursosDialog] = useState(false);
    const [Recurso, setRecurso] = useState<Projeto.Recurso>(emptyRecurso);
    const [selectedRecursos, setSelectedRecursos] = useState<Projeto.Recurso[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);
    const recursoService = useMemo(() => new RecursoService(), []);


    useEffect(() => {
        if(!Recursos){
        recursoService.listarTodos()
            .then((response) => {
                console.log(response.data);
                setRecursos(response.data);
            }).catch((error) => {
                console.log(error);
            })
        }
    }, [recursoService,Recursos]);


    const openNew = () => {
        setRecurso(emptyRecurso);
        setSubmitted(false);
        setRecursoDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setRecursoDialog(false);
    };

    const hideDeleteRecursoDialog = () => {
        setDeleteRecursoDialog(false);
    };

    const hideDeleteRecursosDialog = () => {
        setDeleteRecursosDialog(false);
    };

    const saveRecurso = () => {
        setSubmitted(true);

        if (!Recurso.id) {
            Recurso.id = undefined;
            recursoService.inserir(Recurso).then((response) => {
                setRecursoDialog(false);
                setRecurso(emptyRecurso);
                setRecursos(null);
                toast.current?.show({
                    severity: "info",
                    summary: "Sucesso!",
                    detail: "Recurso cadastrado com sucesso!"
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
           recursoService.alterar(Recurso).then((response) => {
            setRecursoDialog(false);
                setRecurso(emptyRecurso);   
                setRecursos([]);
                toast.current?.show({
                    severity: "info",
                    summary: "Sucesso!",
                    detail: "Recurso alterado com sucesso!"
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

    const editRecurso = (Recurso: Projeto.Recurso) => {
        setRecurso({ ...Recurso });
        setRecursoDialog(true);
    };

    const confirmDeleteRecurso = (recurso: Projeto.Recurso) => {
        setRecurso(recurso);
        setDeleteRecursoDialog(true);
    };

    const deleteRecurso = () => {
       if(Recurso.id){
        recursoService.excluir(Recurso.id).then((response) =>{
            setDeleteRecursoDialog(false);
            setRecurso(emptyRecurso);
            setRecursos([]);
            toast.current?.show({
                severity: 'info',
                summary: 'Sucesso',
                detail: 'Recurso excluido com sucesso',
                life: 3000
            });

        }).catch((error)=>{
            toast.current?.show({
                severity: 'error',
                summary: 'Erro!',
                detail: 'Erro ao excluir recurso',
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
        setDeleteRecursosDialog(true);
    };

    const deleteSelectedRecursos = () => {
       Promise.all(selectedRecursos.map(async(_Recurso) => {
            if(_Recurso.id){
            await recursoService.excluir(_Recurso.id);
        }
        })).then((response) =>{
            setRecursos([]);    
            setSelectedRecursos([]);
            setDeleteRecursosDialog(false);
            toast.current?.show({
                severity: 'info',
                summary: 'Sucesso',
                detail: 'Recursos excluidos com sucesso',
                life: 3000
            });
        }).catch((error) =>{
            toast.current?.show({
                severity: 'error',
                summary: 'Erro',
                detail: 'Erro oa excluir recursos',
                life: 3000
            });
        })

    };
    
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
       /* const val = (e.target && e.target.value) || '';
        let _Recurso = { ...Recurso };
          _Recurso[`${name}`] = val;
        setRecurso(_Recurso);
        */
       setRecurso(prevRecurso => ({
        ...prevRecurso,
        [name]: val,
       }));
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="New" icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew} />
                    <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedRecursos || !(selectedRecursos as any).length} />
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

    const idBodyTemplate = (rowData: Projeto.Recurso) => {
        return (
            <>
                <span className="p-column-title">Código</span>
                {rowData.id}
            </>
        );
    };

    const nomeBodyTemplate = (rowData: Projeto.Recurso) => {
        return (
            <>
                <span className="p-column-title">Nome</span>
                {rowData.nome}
            </>
        );
    };

    const chaveBodyTemplate = (rowData: Projeto.Recurso) => {
        return (
            <>
                <span className="p-column-title">chave</span>
                {rowData.chave}
            </>
        );
    };

 


    const actionBodyTemplate = (rowData: Projeto.Recurso) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => editRecurso(rowData)} />
                <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDeleteRecurso(rowData)} />
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Gerenciamento de Recursos</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const RecursoDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Salvar" icon="pi pi-check" text onClick={saveRecurso} />
        </>
    );
    const deleteRecursoDialogFooter = (
        <>
            <Button label="Não" icon="pi pi-times" text onClick={hideDeleteRecursoDialog} />
            <Button label="Sim" icon="pi pi-check" text onClick={deleteRecurso} />
        </>
    );
    const deleteRecursosDialogFooter = (
        <>
            <Button label="Não" icon="pi pi-times" text onClick={hideDeleteRecursosDialog} />
            <Button label="Sim" icon="pi pi-check" text onClick={deleteSelectedRecursos} />
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
                        value={Recursos}
                        selection={selectedRecursos}
                        onSelectionChange={(e) => setSelectedRecursos(e.value as any)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando {first} até {last} de {totalRecords} Recursos"
                        globalFilter={globalFilter}
                        emptyMessage="Nenhum recurso encontrado."
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                        <Column field="id" header="Código" sortable body={idBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="nome" header="Nome" sortable body={nomeBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="chave" header="chave" sortable body={chaveBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        


                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>o

                    <Dialog visible={RecursoDialog} style={{ width: '450px' }} header="Detalhes de Recurso" modal className="p-fluid" footer={RecursoDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="nome">Nome</label>
                            <InputText
                                id="nome"
                                value={Recurso.nome}
                                onChange={(e) => onInputChange(e, 'nome')}
                                required
                                autoFocus
                                className={classNames({
                                    'p-invalid': submitted && !Recurso.nome
                                })}
                            />
                            {submitted && !Recurso.nome && <small className="p-invalid">Nome é obrigatorio.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="chave">chave</label>
                            <InputText
                                id="chave"
                                value={Recurso.chave}
                                onChange={(e) => onInputChange(e, 'chave')}
                                required
                                autoFocus
                                className={classNames({
                                    'p-invalid': submitted && !Recurso.nome
                                })}
                            />
                            {submitted && !Recurso.chave && <small className="p-invalid">chave é obrigatorio.</small>}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteRecursoDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteRecursoDialogFooter} onHide={hideDeleteRecursoDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {Recurso && (
                                <span>
                                    Você realmete deseja excluir o recurso <b>{Recurso.nome}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteRecursosDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteRecursosDialogFooter} onHide={hideDeleteRecursosDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {Recurso && <span>Você realmete deseja excluir os Recursos selecionados?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default Recurso;
