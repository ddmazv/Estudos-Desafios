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
import { UsuarioService } from '@/service/UsuarioService';

/* @todo Used 'as any' for types here. Will fix in next version due to onSelectionChange event type issue. */
const User = () => {
    let emptyUsuario: Projeto.Usuario = {
        id: 0,
        nome: '',
        login: '',
        email: '',
        senha: ''
    };

    const [Usuarios, setUsuarios] = useState<Projeto.Usuario[]| null>(null);
    const [UsuarioDialog, setUsuarioDialog] = useState(false);
    const [deleteUsuarioDialog, setDeleteUsuarioDialog] = useState(false);
    const [deleteUsuariosDialog, setDeleteUsuariosDialog] = useState(false);
    const [Usuario, setUsuario] = useState<Projeto.Usuario>(emptyUsuario);
    const [selectedUsuarios, setSelectedUsuarios] = useState<Projeto.Usuario[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);
    const usuarioService = useMemo(() => new UsuarioService(), []);


    useEffect(() => {
        if(!Usuarios){
        usuarioService.listarTodos()
            .then((response) => {
                console.log(response.data);
                setUsuarios(response.data);
            }).catch((error) => {
                console.log(error);
            })
        }
    }, [usuarioService,Usuarios]);


    const openNew = () => {
        setUsuario(emptyUsuario);
        setSubmitted(false);
        setUsuarioDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setUsuarioDialog(false);
    };

    const hideDeleteUsuarioDialog = () => {
        setDeleteUsuarioDialog(false);
    };

    const hideDeleteUsuariosDialog = () => {
        setDeleteUsuariosDialog(false);
    };

    const saveUsuario = () => {
        setSubmitted(true);

        if (!Usuario.id) {
            Usuario.id = undefined;
            usuarioService.inserir(Usuario).then((response) => {
                setUsuarioDialog(false);
                setUsuario(emptyUsuario);
                setUsuarios(null);
                toast.current?.show({
                    severity: "info",
                    summary: "Sucesso!",
                    detail: "Usuário cadastrado com sucesso!"
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
           usuarioService.alterar(Usuario).then((response) => {
            setUsuarioDialog(false);
                setUsuario(emptyUsuario);   
                setUsuarios([]);
                toast.current?.show({
                    severity: "info",
                    summary: "Sucesso!",
                    detail: "Usuário alterado com sucesso!"
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

    const editUsuario = (Usuario: Projeto.Usuario) => {
        setUsuario({ ...Usuario });
        setUsuarioDialog(true);
    };

    const confirmDeleteUsuario = (Usuario: Projeto.Usuario) => {
        setUsuario(Usuario);
        setDeleteUsuarioDialog(true);
    };

    const deleteUsuario = () => {
       if(Usuario.id){
        usuarioService.excluir(Usuario.id).then((response) =>{
            setDeleteUsuarioDialog(false);
            setUsuario(emptyUsuario);
            setUsuarios([]);
            toast.current?.show({
                severity: 'info',
                summary: 'Sucesso',
                detail: 'Usuário excluido com sucesso',
                life: 3000
            });

        }).catch((error)=>{
            toast.current?.show({
                severity: 'error',
                summary: 'Erro!',
                detail: 'Erro ao excluir usuário',
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
        setDeleteUsuariosDialog(true);
    };

    const deleteSelectedUsuarios = () => {
       Promise.all(selectedUsuarios.map(async(_usuario) => {
            if(_usuario.id){
            await usuarioService.excluir(_usuario.id);
        }
        })).then((response) =>{
            setUsuarios([]);    
            setSelectedUsuarios([]);
            setDeleteUsuariosDialog(false);
            toast.current?.show({
                severity: 'info',
                summary: 'Sucesso',
                detail: 'Usuários excluidos com sucesso',
                life: 3000
            });
        }).catch((error) =>{
            toast.current?.show({
                severity: 'error',
                summary: 'Erro',
                detail: 'Erro oa excluir Usuários',
                life: 3000
            });
        })

    };
    
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _Usuario = { ...Usuario };
          _Usuario[`${name}`] = val;

        setUsuario(_Usuario);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="New" icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew} />
                    <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedUsuarios || !(selectedUsuarios as any).length} />
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

    const idBodyTemplate = (rowData: Projeto.Usuario) => {
        return (
            <>
                <span className="p-column-title">Código</span>
                {rowData.id}
            </>
        );
    };

    const nomeBodyTemplate = (rowData: Projeto.Usuario) => {
        return (
            <>
                <span className="p-column-title">Nome</span>
                {rowData.nome}
            </>
        );
    };

    const loginBodyTemplate = (rowData: Projeto.Usuario) => {
        return (
            <>
                <span className="p-column-title">Login</span>
                {rowData.login}
            </>
        );
    };

    const emailBodyTemplate = (rowData: Projeto.Usuario) => {
        return (
            <>
                <span className="p-column-title">email</span>
                {rowData.email}
            </>
        );
    };


    const actionBodyTemplate = (rowData: Projeto.Usuario) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => editUsuario(rowData)} />
                <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDeleteUsuario(rowData)} />
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Gerenciamento de Usuários</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const UsuarioDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Salvar" icon="pi pi-check" text onClick={saveUsuario} />
        </>
    );
    const deleteUsuarioDialogFooter = (
        <>
            <Button label="Não" icon="pi pi-times" text onClick={hideDeleteUsuarioDialog} />
            <Button label="Sim" icon="pi pi-check" text onClick={deleteUsuario} />
        </>
    );
    const deleteUsuariosDialogFooter = (
        <>
            <Button label="Não" icon="pi pi-times" text onClick={hideDeleteUsuariosDialog} />
            <Button label="Sim" icon="pi pi-check" text onClick={deleteSelectedUsuarios} />
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
                        value={Usuarios}
                        selection={selectedUsuarios}
                        onSelectionChange={(e) => setSelectedUsuarios(e.value as any)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando {first} até {last} de {totalRecords} Usuarios"
                        globalFilter={globalFilter}
                        emptyMessage="Nenhum usuário encontrado."
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                        <Column field="id" header="Código" sortable body={idBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="nome" header="Nome" sortable body={nomeBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="login" header="Login" sortable body={loginBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="email" header="Email" sortable body={emailBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>


                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>o

                    <Dialog visible={UsuarioDialog} style={{ width: '450px' }} header="Detalhes de Usuario" modal className="p-fluid" footer={UsuarioDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="nome">Nome</label>
                            <InputText
                                id="nome"
                                value={Usuario.nome}
                                onChange={(e) => onInputChange(e, 'nome')}
                                required
                                autoFocus
                                className={classNames({
                                    'p-invalid': submitted && !Usuario.nome
                                })}
                            />
                            {submitted && !Usuario.nome && <small className="p-invalid">Nome é obrigatorio.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="login">Login</label>
                            <InputText
                                id="login"
                                value={Usuario.login}
                                onChange={(e) => onInputChange(e, 'login')}
                                required
                                autoFocus
                                className={classNames({
                                    'p-invalid': submitted && !Usuario.nome
                                })}
                            />
                            {submitted && !Usuario.login && <small className="p-invalid">Login é obrigatorio.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="email">Email</label>
                            <InputText
                                id="email"
                                value={Usuario.email}
                                onChange={(e) => onInputChange(e, 'email')}
                                required
                                autoFocus
                                className={classNames({
                                    'p-invalid': submitted && !Usuario.nome
                                })}
                            />
                            {submitted && !Usuario.email && <small className="p-invalid">Email é obrigatorio.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="senha">Senha</label>
                            <InputText
                                id="senha"
                                value={Usuario.senha}
                                onChange={(e) => onInputChange(e, 'senha')}
                                required
                                autoFocus
                                className={classNames({
                                    'p-invalid': submitted && !Usuario.nome
                                })}
                            />
                            {submitted && !Usuario.senha && <small className="p-invalid">Senha é obrigatorio.</small>}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteUsuarioDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteUsuarioDialogFooter} onHide={hideDeleteUsuarioDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {Usuario && (
                                <span>
                                    Você realmete deseja excluir o usuário <b>{Usuario.nome}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteUsuariosDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteUsuariosDialogFooter} onHide={hideDeleteUsuariosDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {Usuario && <span>Você realmete deseja excluir os usuarios selecionados?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default User;
