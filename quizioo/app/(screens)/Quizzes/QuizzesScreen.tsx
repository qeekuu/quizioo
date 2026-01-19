import { Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../Quizzes/QuizzesScreen.style";
import { Dropdown } from "react-native-element-dropdown";
import { useEffect, useState, useRef, useCallback } from "react";
import { Category, Quiz } from "@/app/(api)/types";
import { api } from "@/app/(api)/client";
import { Ionicons } from "@expo/vector-icons";
import {FlatList} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/app/(navigation)/types";
import { useFocusEffect } from "@react-navigation/native";

type Nav = NativeStackNavigationProp<RootStackParamList, "QuizDetails">;

export default function QuizzesScreen()
{
	const navigation = useNavigation<Nav>();
    const QUIZZES_PER_PAGE = 3;

    const [quizCategory, setQuizCategory] = useState<string | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [catLoading, setCatLoading] = useState(true);
    // const [search, setSearch] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
	const [allQuizzes, setAllQuizzes] = useState<Quiz[]>([]);
	const [search, setSearch] = useState("");

	useFocusEffect(
		useCallback(() => {
			let active = true;

			(async () => {
			try {
				const data = await api.listQuizzesExisting();
				if (active) setAllQuizzes(data);
			} catch (e: any) {
				Alert.alert("Error", e?.message ?? "Cannot load quizzes");
			}
		})();

		return () => {
			active = false;
		};
	  }, [])
	);

	useEffect(() => {
		setPage(1);
	}, [search, quizCategory]);
	useEffect(() => {
		let active = true;

		(async () => {
		try {
			setCatLoading(true);
			const data = await api.listCategories();
			if (active) setCategories(data);
		} catch (e: any) {
			Alert.alert("Error", e?.message ?? "Cannot load categories");
		} finally {
			if (active) setCatLoading(false);
		}
	})();

	return () => {
		active = false;
	};
  }, []);

    type ItemProps = {quiz: Quiz};

    const Item = ({ quiz }: ItemProps) => (
        <TouchableOpacity 
			style={styles.containerItem}
			onPress={() => navigation.navigate("QuizDetails", { id: quiz.id })}
		>
            <View style={styles.leftIcon}>
                <Ionicons name="book-sharp" size={32} color="rgba(100, 200, 255, 0.8)" />
            </View>

            <View style={styles.centerText}>
                <Text style={styles.title}>{quiz.quizName}</Text>
                <Text style={styles.subTitle}>{quiz.quizType}</Text>
            </View>

            <View style={styles.rightArrow}>
                <Text style={styles.quizArrow}>{'>'}</Text>
            </View>
        </TouchableOpacity>
    );

    {/*const filteredQuizzes = quizzes.filter((q) => {
		const matchesCategory = !quizCategory || q.quizType === quizCategory;

		const matchesSearch = search.trim().length === 0 || q.quizName.toLowerCase().includes(search.trim().toLowerCase());

		return matchesCategory && matchesSearch;
	});
	*/}
	const filteredQuizzes = allQuizzes.filter((q) => {
		const matchesCategory = !quizCategory || q.quizType === quizCategory;

		const matchesSearch = search.trim().length === 0 || q.quizName.toLowerCase().includes(search.trim().toLowerCase());

		return matchesCategory && matchesSearch;
	});
	const total = filteredQuizzes.length;
	const lastPage = Math.max(1, Math.ceil(total / QUIZZES_PER_PAGE));
	const safePage = Math.min(page, lastPage);

	const pagedQuizzes = filteredQuizzes.slice(
		(safePage - 1) * QUIZZES_PER_PAGE,
		safePage * QUIZZES_PER_PAGE
	);


	function onPrevPage() {
		if (safePage > 1) setPage((p) => p - 1);
	}

	function onNextPage() {
		if (safePage < lastPage) setPage((p) => p + 1);
	}

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}>
                <Text style={styles.topBarText}>Quizzes</Text>
            </View>
            <View style={styles.searchCard}>
                <Text style={styles.searchCardText}>Filters:</Text>
                <Dropdown
                    data={categories}
                    labelField="label"
                    valueField="label"
                    placeholder={catLoading ? "Loading..." : "Select category..."}
                    disable={catLoading || categories.length === 0}
                    value={quizCategory}
                    onChange={(item: Category) => setQuizCategory(item.label)}

                    style={styles.dropdown}
                    placeholderStyle={styles.dropdownPlaceholder}
                    selectedTextStyle={styles.dropdownSelectedText}
                    containerStyle={styles.dropdownListContainer}
                    itemTextStyle={styles.dropdownItemText}
                    itemContainerStyle={styles.dropdownItemContainer}
                    activeColor={styles.dropdownActiveColor}
                />

                <TextInput
                    style={styles.searchInput}
                    placeholder="Search for quizzes..."
                    placeholderTextColor={"#FFFFFF"}
                    value={search}
                    onChangeText={setSearch}
                />
                <TouchableOpacity
                    onPress={() => {
                        setQuizCategory(null);
                        setSearch("");
                    }}
                    disabled={!quizCategory && search.trim().length === 0}
                    style={styles.button}
                >
                    <Text style={styles.text}>Reset filters</Text>
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1 }}>
                <FlatList
                    data={pagedQuizzes}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <Item quiz={item} />}
                    ListEmptyComponent={
                        !loading ? (
                            <Text style={{ textAlign: "center", color: "#aaa", marginTop: 20 }}>
                                No quizzes available
                            </Text>
                        ) : null
                    }
                />
                <View style={styles.paginationRow}>
					<TouchableOpacity
						disabled={safePage <= 1}
						onPress={onPrevPage}
						style={[styles.pagBtn, safePage <= 1 && styles.pagBtnDisabled]}
					>
						<Text style={styles.pagBtnText}>Prev</Text>
					</TouchableOpacity>

                    <Text style={styles.pageInfo}>Strona {page}</Text>

					<TouchableOpacity
						disabled={safePage >= lastPage}
						onPress={onNextPage}
						style={[styles.pagBtn, safePage >= lastPage && styles.pagBtnDisabled]}
						>
						<Text style={styles.pagBtnText}>Next</Text>
					</TouchableOpacity>

                </View>

            </View>
        </SafeAreaView>
    );
}
