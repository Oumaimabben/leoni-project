import React,{useState,useEffect} from 'react';
import { Button, Tag, notification, Table, Modal } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import UserDashboard from '../../../Components/Dashboard';
import axios from "axios";

const Confirmation_rebut = () => {
    const [data, setData] = useState([]);
    const [confirmModal, setConfirmModal] = useState(false);
    const [seletectedItem, setSeletectedItem] = useState(null);
    const[loading,setLoading]=useState(true);

    var getlocal = localStorage.getItem("token");
    var bearer = localStorage.getItem("token") ? `Bearer ${getlocal}` : "";
    const toggleConfirmModal = (id) => {
      setConfirmModal(!confirmModal);
      setSeletectedItem(id != null ? id : null);
      if (id) {
        getData();
      }
    };
  
    const handleConfirm = () => {
      if (seletectedItem != null) {
         axios
          .patch(
            "http://localhost:8800/admin/rebut/" + seletectedItem,{etat:"Accepte"},
            {
                headers: {
                  authorization: bearer,

                },
                
              }
          )
          .then((data) => {
            notification.success({ message: "autorisation accepté" });
            toggleConfirmModal();
            getData();
          })
          .catch((err) => {
            console.log(err);
          });
      }
      toggleConfirmModal();
    };
    const columns = [
      {
        title: "id",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "nature_investissement",
        dataIndex: "nature_investissement",
        key: "nature_investissement",
      },
      {
        title: "caracteristiques",
        dataIndex: "caracteristiques",
        key: "caracteristiques",
      },
      {
        title: "montant_acquisition",
        dataIndex: "montant_acquisition",
        key: "montant_acquisition",
      },
      {
        title: "centre_cout",
        dataIndex: "centre_cout",
        key: "centre_cout",
      },
      {
        title: "perte",
        dataIndex: "perte",
        key: "perte",
      },
      {
        title: "date_acquisition",
        dataIndex: "date_acquisition",
        key: "date_acquisition",
      },
      {
        title: "date_sortie",
        dataIndex: "date_sortie",
        key: "date_sortie",
      },
      {
        title: "cause_rebut",
        dataIndex: "cause_rebut",
        key: "cause_rebut",
      },
      {
        title: "userId",
        dataIndex: "userId",
        key: "userId",
      },
      {
        title: "état",
        key: "état",
        render: (fila) => (
          <>
            <Tag
              style={{
                padding: "0.5em",
              }}
              icon={<SyncOutlined spin />}
              color="processing"
            >
              En attente
            </Tag>
          </>
        ),
      },
      {
        title: "action",
        key: "action",
        render: (action) => (
          <>
            <Button type="primary" onClick={() => toggleConfirmModal(action.id)}>
              accepter
            </Button>
          </>
        ),
      },
    ];
  
   
    const getData = () => {
      axios
        .get(
          "http://localhost:8800/admin/rebut/?status=En_attente",
          {
            headers: {
              authorization: bearer,
            },
          }
        )
        .then((data) => {
          setData(
            data.data.msg.map((row) => ({
              id: row.id,
              nature_investissement: row.nature_investissement,
              caracteristiques: row.caracteristiques,
              montant_acquisition: row.montant_acquisition,
              centre_cout: row.centre_cout,
              perte: row.perte,
              date_acquisition: row.date_acquisition,
              date_sortie: row.date_sortie,
              cause_rebut: row.cause_rebut,
              userId: row.userId,
              key: row.id,
            }))
          );
          setLoading(false);
        })
        .catch((err) => {
            setLoading(false);
        });
    };
  
    useEffect(() => {
      getData();
    // eslint-disable-next-line
    }, []);
  
    return (
      <UserDashboard>
        <div>
          {confirmModal && (
            <Modal
              title={`accepte autorisation n° ${seletectedItem}`}
              visible={confirmModal}
              onOk={handleConfirm}
              onCancel={() => toggleConfirmModal()}
              okText="accepte"
              cancelText="Cancel"
              okButtonProps={{
                type: "primary",
              }}
            >
              Vous êtes sûr d'accepter cette autorisation ??
            </Modal>
          )}
          <Table
           loading={loading}
            bordered
            dataSource={data}
            columns={columns}
            scroll={{ x: true }}
            pagination={{
              size: "small",
              position: ["topRight"],
            }}
          />
        </div>
      </UserDashboard>
    );
  };

export default Confirmation_rebut