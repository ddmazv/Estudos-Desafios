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
import { PerfilUserService } from '@/service/PerfilUserService';
import { UsuarioService } from '@/service/UsuarioService';
import { PerfilService } from '@/service/PerfilService';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';


/* @todo Used 'as any' for types here. Will fix in next version due to onSelectionChange event type issue. */
const PerfilUser = () => {
    let emptyPerfilUser: Projeto.PerfilUser = {
        id: 0,
        perfil: {descri: ''},
        user: {nome: '', login:'', senha:'', email:''}
        
    };

    const [PerfisUsers, setPerfisUsers] = useState<Projeto.PerfilUser[] | null>(null);
    const [PerfilUserDialog, setPerfilUserDialog] = useState(false);
    const [deletePerfilUserDialog, setDeletePerfilUserDialog] = useState(false);
    const [deletePerfisUsersDialog, setDeletePerfisUsersDialog] = useState(false);
    const [PerfilUser, setPerfilUser] = useState<Projeto.PerfilUser>(emptyPerfilUser);
    const [selectedPerfisUsers, setSelectedPerfisUsers] = useState<Projeto.PerfilUser[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);
    const perfisUsersService = useMemo(() => new PerfilUserService(), []);
    const userService = useMemo(() => new UsuarioService(),[]);
    const perfilService = useMemo (() => new PerfilService(), []);
    const [users, setUsers] = useState<Projeto.Usuario[]>([]);
    const [perfis, setPerfis] = useState<Projeto.Perfil[]>([]);

    useEffect(() => {
        if(!PerfisUsers){
        perfisUsersService.listarTodos()
            .then((response) => {
                console.log(response.data);
                setPerfisUsers(response.data);
            }).catch((error) => {
                console.log(error);
            })
        }
    }, [perfisUsersService,PerfisUsers]);

    useEffect(() =>{
        if(PerfilUserDialog){
            userService.listarTodos().then((response) => setUsers(response.data)).catch(error => {
                console.log(error);
                toast.current?.show({
                    severity: "error",
                    summary: "Erro!",
                    detail: "Erro ao buscar usuários"
                });
            });
            perfilService.listarTodos().then((response) => setPerfis(response.data)).catch(error => {
                console.log(error);
                toast.current?.show({
                    severity: "error",
                    summary: "Erro!",
                    detail: "Erro ao buscar perfis"
                });
            });
        }
    }, [PerfilUserDialog]);

    const openNew = () => {
        setPerfilUser(emptyPerfilUser);
        setSubmitted(false);
        setPerfilUserDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setPerfilUserDialog(false);
    };

    const hideDeletePerfilUserDialog = () => {
        setDeletePerfilUserDialog(false);
    };

    const hideDeletePerfisUsersDialog = () => {
        setDeletePerfisUsersDialog(false);
    };

    const savePerfilUser = () => {
        setSubmitted(true);

        if (!PerfilUser.id) {
            PerfilUser.id = undefined;
            perfisUsersService.inserir(PerfilUser).then((response) => {
                setPerfilUserDialog(false);
                setPerfilUser(emptyPerfilUser);
                setPerfisUsers(null);
                toast.current?.show({
                    severity: "info",
                    summary: "Sucesso!",
                    detail: "Perfil-Usuário cadastrado com sucesso!"
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
           perfisUsersService.alterar(PerfilUser).then((response) => {
            setPerfilUserDialog(false);
                setPerfilUser(emptyPerfilUser);   
                setPerfisUsers([]);
                toast.current?.show({
                    severity: "info",
                    summary: "Sucesso!",
                    detail: "Perfil-Usuário alterado com sucesso!"
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

    const editPerfilUser = (PerfilUser: Projeto.PerfilUser) => {
        setPerfilUser({ ...PerfilUser });
        setPerfilUserDialog(true);
    };

    const confirmDeletePerfilUser = (PerfilUser: Projeto.PerfilUser) => {
        setPerfilUser(PerfilUser);
        setDeletePerfilUserDialog(true);
    };

    const deletePerfilUser = () => {
       if(PerfilUser.id){
        perfisUsersService.excluir(PerfilUser.id).then((response) =>{
            setDeletePerfilUserDialog(false);
            setPerfilUser(emptyPerfilUser);
            setPerfisUsers([]);
            toast.current?.show({
                severity: 'info',
                summary: 'Sucesso',
                detail: 'Perfil-Usuário excluido com sucesso',
                life: 3000
            });

        }).catch((error)=>{
            toast.current?.show({
                severity: 'error',
                summary: 'Erro!',
                detail: 'Erro ao excluir Perfil-Usuário',
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
        setDeletePerfisUsersDialog(true);
    };

    const deleteSelectedPerfisUsers = () => {
       Promise.all(selectedPerfisUsers.map(async(_PerfilUser) => {
            if(_PerfilUser.id){
            await perfisUsersService.excluir(_PerfilUser.id);
        }
        })).then((response) =>{
            setPerfisUsers([]);    
            setSelectedPerfisUsers([]);
            setDeletePerfisUsersDialog(false);
            toast.current?.show({
                severity: 'info',
                summary: 'Sucesso',
                detail: 'Perfis-Usuários excluidos com sucesso',
                life: 3000
            });
        }).catch((error) =>{
            toast.current?.show({
                severity: 'error',
                summary: 'Erro',
                detail: 'Erro oa excluir Perfis-Usuários',
                life: 3000
            });
        })

    };
    
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
       /* const val = (e.target && e.target.value) || '';
        let _PerfilUser = { ...PerfilUser };
          _PerfilUser[`${name}`] = val;
        setPerfilUser(_PerfilUser);
        */
       setPerfilUser(prevPerfilUser => ({
        ...prevPerfilUser,
        [name]: val,
       }));
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="New" icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew} />
                    <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedPerfisUsers || !(selectedPerfisUsers as any).length} />
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

    const idBodyTemplate = (rowData: Projeto.PerfilUser) => {
        return (
            <>
                <span className="p-column-title">id</span>
                {rowData.id}
            </>
        );
    };

  

    const userBodyTemplate = (rowData: Projeto.PerfilUser) => {
        return (
            <>
                <span className="p-column-title">User</span>
                {rowData.user.nome}
            </>
        );
    };

    const perfilBodyTemplate = (rowData: Projeto.PerfilUser) => {
        return (
            <>
                <span className="p-column-title">perfil</span>
                {rowData.perfil.descri}
            </>
        );
    };
 


    const actionBodyTemplate = (rowData: Projeto.PerfilUser) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => editPerfilUser(rowData)} />
                <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDeletePerfilUser(rowData)} />
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Gerenciamento de Perfis-Usuários</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const PerfilUserDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Salvar" icon="pi pi-check" text onClick={savePerfilUser} />
        </>
    );
    const deletePerfilUserDialogFooter = (
        <>
            <Button label="Não" icon="pi pi-times" text onClick={hideDeletePerfilUserDialog} />
            <Button label="Sim" icon="pi pi-check" text onClick={deletePerfilUser} />
        </>
    );
    const deletePerfisUsersDialogFooter = (
        <>
            <Button label="Não" icon="pi pi-times" text onClick={hideDeletePerfisUsersDialog} />
            <Button label="Sim" icon="pi pi-check" text onClick={deleteSelectedPerfisUsers} />
        </>
    );

    const onSelectPerfilChange = (perfil: Projeto.Perfil) => {
        let _PerfilUser = {...PerfilUser};
        _PerfilUser.perfil = perfil;
        setPerfilUser(_PerfilUser);
    }
    
    const onSelectUserChange = (user: Projeto.Usuario) => {
        let _PerfilUser = {...PerfilUser};
        _PerfilUser.user = user;    
        setPerfilUser(_PerfilUser);
    }
    
    return (
        <div className="grid crud-Projeto">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable
                        ref={dt}
                        value={PerfisUsers}
                        selection={selectedPerfisUsers}
                        onSelectionChange={(e) => setSelectedPerfisUsers(e.value as any)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando {first} até {last} de {totalRecords} Perfis-Usuários"
                        globalFilter={globalFilter}
                        emptyMessage="Nenhum Perfil-Usuário encontrado."
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                        <Column field="id" header="Código" sortable body={idBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="perfil" header="Perfil" sortable body={perfilBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="user" header="Usuário" sortable body={userBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>


                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>

                    <Dialog visible={PerfilUserDialog} style={{ width: '450px' }} header="Detalhes de PerfilUser" modal className="p-fluid" footer={PerfilUserDialogFooter} onHide={hideDialog}>

                        <div className="field">
                            <label htmlFor="users">Usuários</label>

                              <Dropdown optionLabel='nome' value={PerfilUser.user} options={users} filter onChange={(e: DropdownChangeEvent)=> onSelectUserChange(e.value)} placeholder='Selecione um usuário...'></Dropdown>

                            {submitted && !PerfilUser.user && <small className="p-invalid">Usuário é obrigatorio.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="perfil">Perfis</label>
                           
                                <Dropdown optionLabel='descri' value={PerfilUser.perfil} options={perfis} filter onChange={(e: DropdownChangeEvent)=> onSelectPerfilChange(e.value)} placeholder='Selecione um perfil...'></Dropdown>

                            {submitted && !PerfilUser.perfil && <small className="p-invalid">Perfil é obrigatorio.</small>}
                        </div>
                        
                    </Dialog>

                    <Dialog visible={deletePerfilUserDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deletePerfilUserDialogFooter} onHide={hideDeletePerfilUserDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {PerfilUser && (
                                <span>
                                    Você realmete deseja excluir o Perfil-Usuário <b>{PerfilUser.id}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deletePerfisUsersDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deletePerfisUsersDialogFooter} onHide={hideDeletePerfisUsersDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {PerfilUser && <span>Você realmete deseja excluir os Perfis-Usuários selecionados?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default PerfilUser;
