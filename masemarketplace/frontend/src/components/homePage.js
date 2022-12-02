import React, { Component,useState } from 'react'
import { Menu, Segment } from 'semantic-ui-react'

export default function HomePage()
{

  const [activeItem, setActiveItem] = useState('home');

  function handleItemClick(name)
   {
     setActiveItem(name)
   }
  return (

    <div>
      <Menu pointing secondary>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={() => handleItemClick('home')}
          />
          <Menu.Item
            name='products'
            active={activeItem === 'products'}
            onClick={() => handleItemClick('products')}
          />
          <Menu.Item
            name='friends'
            active={activeItem === 'friends'}
            onClick={() => handleItemClick('friends')}
          />
          <Menu.Menu position='right'>
            <Menu.Item
              name='logout'
              active={activeItem === 'logout'}
              onClick={() => handleItemClick('logout')}
            />
          </Menu.Menu>
        </Menu>
    </div>

  )
}