// @ts-ignore

import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { CreateStore } from './CreateStore/CreateStore';
import { CreateProduct } from './CreateProduct/CreateProduct';

const basicApi = process.env.REACT_APP_API_URL ?? '';
const token = localStorage.getItem('access') || '';
const userInfoString = localStorage.getItem('userInfo');
const userInfo = userInfoString !== null ? JSON.parse(userInfoString) : '';
const userId = userInfo.id;

const axiosInstance = axios.create({
  baseURL: basicApi,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

interface Store {
  id: number;
  name: string;
  address: string;
  description: string;
  logo: string;
  product_limit: number;
  store_info: {
    name: string;
    address: string;
    description: string;
    logo: string;
    product_limit: number;
  };
  products: Array<any>;
}

export const ProfileShop: FC = () => {
  const [stores, setStores] = useState([]);
  const [isCreateStoreModalOpen, setIsCreateStoreModalOpen] = useState(false);
  const [userStore, setUserStore] = useState<Store | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    description: '',
    logo: null as File | null, // Use null for file
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axiosInstance
      .get('/api/v1/stores/stores/')
      .then((response) => {
        setStores(response.data.results);
        const store = response.data.results.find((store: any) => store.seller === userId);
        setUserStore(store);
      })
      .catch((error) => {
        console.error('Error loading stores:', error);
      });
  }, [userId]);

  useEffect(() => {
    if (userStore && userStore.id) {
      axiosInstance
        .get(`/api/v1/stores/stores/${userStore.id}/`)
        .then((response) => {
          setUserStore(response.data as Store); // Annotate the type of the response data
        })
        .catch((error) => {
          console.error('Error loading user store data:', error);
        });
    }
  }, [userStore]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFormData({
      ...formData,
      logo: file || null,
    });
  };

  const handleCreateStore = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('description', formData.description);
    if (formData.logo) {
      formDataToSend.append('logo', formData.logo);
    }
    formDataToSend.append('seller', userId);

    axiosInstance
      .post(`/api/v1/stores/stores/`, formDataToSend)
      .then((response) => {
        setUserStore(response.data);
        setFormData({
          name: '',
          address: '',
          description: '',
          logo: null,
        });
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error('Error creating store:', error);
      });
  };
  console.log(userStore);

  return (
    <div>
      {userStore ? (
        <>
          <div>
            <h2 style={{ color: '#47535F', fontSize: '24px' }}>
              Магазин: <b>{userStore.name}</b>
            </h2>
            <p style={{ color: '#47535F', fontSize: '20px' }}>Адрес: {userStore.address}</p>
            {userStore.logo === null ? null : (
              <img src={`${basicApi}${userStore.store_info?.logo}`} alt={userStore.store_info?.name} className='w-32 h-32' />
            )}
            <p style={{ color: '#47535F', fontSize: '24px', fontWeight: '600' }}>Описание:</p>
            <p>{userStore.description}</p>

            <h3 className='text-xl font-semibold mt-4'>Products</h3>
            {/*<ul>{userStore.products?.map((product: Store) => <li key={product.id}>{product.name}</li>)}</ul>*/}
          </div>
          <CreateProduct />
        </>
      ) : (
        <div className='flex flex-col justify-center items-center h-screen '>
          {isCreateStoreModalOpen ? null : (
            <h2
              className='text-2xl font-semibold mb-4'
              style={{ color: '#47535F', fontSize: '24px', fontFamily: 'Inter', fontWeight: 500, wordWrap: 'break-word' }}
            >
              Вы пока не создали магазин
            </h2>
          )}
          {isCreateStoreModalOpen ? null : (
            <button
              className='text-white font-bold py-2 px-4 rounded'
              style={{
                fontSize: '18px',
                fontFamily: 'Inter',
                fontWeight: 600,
                wordWrap: 'break-word',
                background: '#47535F',
                width: '20%',
              }}
              onClick={() => setIsCreateStoreModalOpen(true)}
            >
              Создать магазин
            </button>
          )}
          {isCreateStoreModalOpen && <CreateStore onCreateStore={handleCreateStore} onCancel={() => setIsCreateStoreModalOpen(false)} />}
        </div>
      )}
    </div>
  );
};
