import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

export default function Sample3() {

    const [listData, setListData] = useState({
        isLoading: false,
        studentData: [],
        currentPage: 1,
        lastPage: 0
    })

    return (
        <View>
            <Text>Sample3</Text>
        </View>
    )
}

const styles = StyleSheet.create({})