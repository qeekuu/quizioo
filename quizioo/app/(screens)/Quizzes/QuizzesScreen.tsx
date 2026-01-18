import { Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../Quizzes/QuizzesScreen.style";
import { Dropdown } from "react-native-element-dropdown";
import { useEffect, useState, useRef } from "react";
import { Category, Quiz } from "@/app/(api)/types";
import { api } from "@/app/(api)/client";
import { Ionicons } from "@expo/vector-icons";
import {FlatList} from "react-native";

export default function QuizzesScreen()
{
    const QUIZZES_PER_PAGE = 3;

    const [quizCategory, setQuizCategory] = useState<string | null>(null);
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [quizLoading, setQuizLoading] = useState(true);
    const [catLoading, setCatLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const abortRef = useRef<AbortController | null>(null);
    const requestIdRef = useRef(0);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                setCatLoading(true);

                const cats = await api.listCategories();
                if(!mounted)
                    return;
                setCategories(cats);
            } catch (e: any) {
                if(!mounted)
                    return;
                Alert.alert("Error", e?.message ?? "Cannot load data");
            } finally {
                if(mounted) {
                    setCatLoading(false);
                }
            }
        })();

        load(1);

        return () => {
            mounted = false;
            abortRef.current?.abort();
        };
    }, []);

    useEffect(() => {
        // gdy user zmienia search/kategorię, wracamy na stronę 1
        load(1);
    }, [quizCategory, search]);

    type ItemProps = {quiz: Quiz};

    const Item = ({ quiz }: ItemProps) => (
        <TouchableOpacity style={styles.containerItem}>
            <View style={styles.leftIcon}>
                <Ionicons name="book-sharp" size={32} color="rgba(100, 200, 255, 0.8" />
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

    async function load(pageToLoad = 1) {
        abortRef.current?.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        const myRequestid = ++requestIdRef.current;

        setLoading(true);
        try {
            const { data, total, next } = await api.listQuizzes({
                page: pageToLoad,
                perPage: QUIZZES_PER_PAGE,
                q: search,
                quizType: quizCategory,
                signal: controller.signal,
            });

            if(myRequestid !== requestIdRef.current)
                return; // jeśli nowy pojawił się w międzyczasie to inoruj ten wynik
            // console.log("Return form API:", { data, total });
            console.log("PAGE DEBUG:", { pageToLoad, got: data.length, total, next, });

            setQuizzes(data);
            setPage(pageToLoad);
            setHasMore(next !== null);

        } catch (e) {
            if((e as any)?.name === "AbortError")
                return;
            Alert.alert("Error", (e as Error).message);
        } finally {
            if(myRequestid === requestIdRef.current)
                setLoading(false);
        }
    };

    async function onNextPage() {
        if (!hasMore || loading) return;
        await load(page + 1);
    };

    async function onPrevPage() {
        if (page <= 1 || loading) return;
        await load(page - 1);
    };

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
                    data={quizzes}
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
                        style={[styles.pagBtn, (page <= 1 || loading) && styles.pagBtnDisabled,]}
                        onPress={onPrevPage}
                        disabled={page <= 1 || loading}
                    >
                        <Text style={[styles.pagBtnText, (page <= 1 || loading) && styles.pagBtnTextDisabled,]}>Prev</Text>
                    </TouchableOpacity>

                    <Text style={styles.pageInfo}>Strona {page}</Text>

                    <TouchableOpacity
                        style={[styles.pagBtn, (!hasMore || loading) && styles.pagBtnDisabled,]}
                        onPress={onNextPage}
                        disabled={!hasMore || loading}
                    >
                        <Text style={[styles.pagBtnText, (!hasMore || loading) && styles.pagBtnTextDisabled,]}>Next</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    );
}