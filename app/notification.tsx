import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from '../components/buttons/BackButton';
import { MediumText } from '../components/Themed';
import { LinearGradient } from 'expo-linear-gradient';


export default function notification() {
    const featuresData = [
        {
            id: 1,
            icon: require("../assets/images/fpt.png"),
            time: "1 phút trước",
            from: "Từ APT Academy",
            description: "Thông báo về mức học phí dự kiến năm học 2023 - 2024"
        },
        {
            id: 2,
            icon: require("../assets/images/fpt.png"),
            time: "1 phút trước",
            from: "Từ APT Academy",
            description: "Thông báo về mức học phí dự kiến năm học 2023 - 2024"
        },
        {
            id: 3,
            icon: require("../assets/images/fpt.png"),
            time: "1 phút trước",
            from: "Từ APT Academy",
            description: "Thông báo về mức học phí dự kiến năm học 2023 - 2024"
        },
        {
            id: 4,
            icon: require("../assets/images/fpt.png"),
            time: "1 phút trước",
            from: "Từ APT Academy",
            description: "Thông báo về mức học phí dự kiến năm học 2023 - 2024"
        },
        {
            id: 5,
            icon: require("../assets/images/fpt.png"),
            time: "1 phút trước",
            from: "Từ APT Academy",
            description: "Thông báo về mức học phí dự kiến năm học 2023 - 2024"
        },
        {
            id: 6,
            icon: require("../assets/images/fpt.png"),
            time: "1 phút trước",
            from: "Từ APT Academy",
            description: "Thông báo về mức học phí dự kiến năm học 2023 - 2024"
        },
        {
            id: 7,
            icon: require("../assets/images/fpt.png"),
            time: "1 phút trước",
            from: "Từ APT Academy",
            description: "Thông báo về mức học phí dự kiến năm học 2023 - 2024"
        },
        {
            id: 8,
            icon: require("../assets/images/fpt.png"),
            time: "1 phút trước",
            from: "Từ APT Academy",
            description: "Thông báo về mức học phí dự kiến năm học 2023 - 2024"
        },
    ]
    
    const [features, setFeatures] = React.useState(featuresData);
    
    const renderItem = ({ item }: { item: typeof featuresData[0] }) => (
        <TouchableWithoutFeedback>
           <View className='flex flex-row justify-center items-center h-[75px] w-full total-container border-b border-gray-300 relative'>
                <View className="bg-[#3074E3] rounded-full w-2 h-2 left-5"></View>
                <View className='w-[48px] h-[48px] rounded-full border border-gray-400 border-opacity-40 left-6'>
                    <Image source={item.icon} className='w-full h-full rounded-full'/>
                </View>
                <View className='left-10'>
                    <Text className='text-[#0F172A]'>{item.description}</Text>
                    <View className='flex-row justify-start items-center mt-2'>
                        <Text className=' text-[#808080] text-sm'>{item.time}</Text>
                        <View className="bg-[#808080] rounded-full w-1 h-1 left-5"></View>
                        <Text className='left-10 top-0 text-[#3074E3] '>{item.from}</Text>
                    </View>
                </View>
               
           </View>
            
        </TouchableWithoutFeedback>
    )

    

  return (
    <SafeAreaView className='flex-1' style={styles.background}>
        <View className='w-full px-4'>
            <MediumText className='w-full flex items-center justify-center text-xl font-medium my-4'>
                Thông báo
            </MediumText>
        </View>  
        <View className='px-4 bg-white h-full w-full rounded-tr-[30px] rounded-tl-[30px] backdrop-blur-[4px] relative'>
            <View className='w-full h-[24px] flex justify-start items-center left-2'>
                <View className='w-[73px] self-stretch  h-[17px]'>
                    <MediumText className='absolute w-[41px] left-0 top-3 text-center font-normal leading-[18px] text-[#3074EE]'>Tất cả</MediumText>
                </View>
                <View className='absolute bg-[#DB2A34] rounded-[4px] left-[50px] top-2'>
                    <Text className='w-full h-full items-center text-white p-1'>10</Text>
                </View>
            </View>
            <View className='h-full pt-4 w-full'>
                <View>
                    <FlatList
                        data={features}
                        keyExtractor={item => `${item.id}`}
                        renderItem={renderItem}
                    />
                </View>
            </View>
            
        </View>
        
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    background: {
        width:'100%',
        height:'50%',
        backgroundColor: 'linear-gradient(180deg, rgba(249, 115, 22, 0.75) 0%, rgba(253, 200, 48, 0.50) 100%)'
    }
})