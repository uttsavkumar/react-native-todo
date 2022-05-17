import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TextInput, Pressable } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons'; 

const data = [
  {
    id: 1,
    title: 'buy Milk',
    status: true,
  },
  {
    id: 2,
    title: 'purchase js book',
    status: true,
  },
  {
    id: 3,
    title: 'read notes',
    status: true,
  },
  {
    id: 4,
    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. At eaque tenetur id dolorem labore vitae est qui enim facere quisquam cumque cupiditate provident voluptas, eligendi officiis molestiae dolorum? Ipsam, quos.',
    status: false,
  },
  {
    id: 5,
    title: 'buy Milk5',
    status: false,
  },
  {
    id: 6,
    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. At eaque tenetur id dolorem labore vitae est qui enim facere quisquam cumque cupiditate provident voluptas, eligendi officiis molestiae dolorum? Ipsam, quos.',
    status: true,
  },
  {
    id: 7,
    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. At eaque tenetur id dolorem labore vitae est qui enim facere quisquam cumque cupiditate provident voluptas, eligendi officiis molestiae dolorum? Ipsam, quos.',
    status: false,
  },

]

export default function App() {
  const [list, setList] = useState(data)
  const [input, setInput] = useState('')
  const [search, setSearch] = useState(false)
  const [searchinput, setSearchInput] = useState('')

  const handleAdd = (event) => {
    const id = list.length ? list.length + 1 : 1
    const formdata = { id, title: input, status: 'false' }
    setList((prevdata) => {
      console.log(prevdata)
      return [...prevdata, formdata]
    })
    setInput('')
  }
  const handleDel = (id) => {
    const del = list.filter((data) => {
      return data.id !== id
    })
    setList(del)
  }
  const handleCheck = (id) => {
    const check = list.map((item) => (
      item.id === id ? { ...item, status: !item.status } : item
    ))
    console.log(check)
    setList(check)
  }
  const handleEvent = () => {
    setSearch(true)

  }
  const handleSearch = () => {
    const data = list.filter((item) => (
      ((item.title).toLowerCase === (searchinput).toLowerCase)
    ))
    setList(data)
    console.log(list)
  }

  return (
    <View style={style.main}>
      <View style={style.header}>
        <Text style={style.date}>Friday, May 11</Text>
        <View style={style.titleSection}>
          {
            search === false
              ?
              <>
                <Text style={style.titleText}>To-Do List</Text>
                <View style={{ alignSelf: 'center', marginTop: 4 }}><FontAwesome name="search" onPress={() => handleEvent()} size={20} color="black" /></View>
              </>
              :
              <>
                <TextInput style={style.search} onChange={(event) => setSearchInput(event.nativeEvent.text)} onKeyPress={(event) => event.nativeEvent.key === 'Enter' ? handleSearch() : console.log('d')} placeholder="Search a Task"></TextInput>
                <View style={{ alignSelf: 'center', marginTop: 5 }}><Entypo name="cross" size={28} color="black" onPress={() => setSearch(false)} /></View>
              </>
          }
        </View>
      </View>

      <ScrollView style={{ borderTopWidth: .2, borderTopColor: '#4a4a4a' }}>
        <View style={style.content}>
          {
            list.map((value, key) => (
              <View style={style.todobox} key={key}>
                <Entypo name="dot-single" size={35} color="black" />
                {value.status === true ?
                  <Text style={style.contentTextFalse}>{value.title}</Text>
                  :
                  <Text style={style.contentText}>{value.title}</Text>
                }
                <Pressable onPress={() => handleDel(value.id)}>
                  <MaterialIcons name="delete" size={24} style={{ marginTop: 5 }} color="red" />
                </Pressable>
                <Pressable onPress={() => handleCheck(value.id)}>
                  <Checkbox style={style.checkbox} status={value.status === true ? "checked" : 'unchecked'} />
                </Pressable>
              </View>

            ))
          }

        </View>
      </ScrollView>


      <View style={{ position: 'relative' }}>
        <View style={style.footer}>
          <TextInput style={style.input} placeholder="Enter a Task" value={input} onChange={(event) => setInput(event.nativeEvent.text)}></TextInput>
          <Pressable style={style.btn} onPress={() => handleAdd()}>
            <Text style={style.add}><AntDesign name="plus" size={24} color="black" /></Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#ebebeb'
  },
  header: {
    marginTop: 70,
    marginLeft: 25,
    marginBottom: 20,
  },
  icon: {
    fontWeight: '700',

  },
  titleSection: {
    flexDirection: 'row',
  },
  date: {
    color: '#4a4a4a',
    paddingBottom: 5,
    marginLeft: 5

  },
  titleText: {
    fontWeight: '800',
    fontSize: 30,
    flexGrow: .9,
    fontFamily: 'sans-serif'
  },
  content: {
    display: 'flex',
    padding: 20,
    flexDirection: 'column',

  },
  todobox: {
    width: 320,
    maxHeight: 'auto',
    marginTop: 15,
    padding: 6,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: 'white'
  },
  contentText: {
    color: '#2e2d2d',
    alignSelf: 'center',
    fontFamily: '',
    fontWeight: '400',
    marginLeft: 5,
    marginTop: -2,
    flex: 1,

  },
  contentTextFalse: {
    color: 'grey',
    alignSelf: 'center',
    fontFamily: '',
    fontWeight: '400',
    marginLeft: 5,
    marginTop: -2,
    flex: 1,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },

  checkbox: {
    height: 10,
    borderRadius: 10,
    borderWidth: .2,
    borderColor: 'white'
  },
  footer: {
    backgroundColor: 'transparent',
    height: 90,
    padding: 20,
    display: 'flex',
    flexDirection: 'row',

  },
  input: {
    width: 220,
    height: 50,
    borderWidth: .5,
    borderColor: 'grey',
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 15,
  },
  search: {
    width: 290,
    height: 40,
    marginTop: 5,
    borderWidth: .5,
    borderColor: 'grey',
    backgroundColor: 'white',
    borderRadius: 30,
    paddingLeft: 15,
    marginRight: 5
  },
  btn: {
    width: 60,
    marginLeft: 25,
    marginTop: -4,
    borderRadius: 60,
    borderColor: 'grey',
    borderWidth: .4,
    backgroundColor: 'white',
    height: 60,
    alignItems: 'center',
    textAlignVertical: 'middle'
  },
  add: {
    marginTop: 16,
    fontWeight: 'bold',
    fontSize: 24
  }
})

