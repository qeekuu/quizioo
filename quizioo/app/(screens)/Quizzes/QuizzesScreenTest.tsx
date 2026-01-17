import { Rect } from "react-native-safe-area-context";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const QUIZZES_PER_PAGE = 3;
const currentItems = getCurrentPageQuizzes();
const startItem = currentPage * QUIZZES_PER_PAGE + 1;
const endItem = Math.min(startItem + currentItems.length - 1, quizzes.length);

export default function Quizzes()
{
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.topBar}>
				<Text style={styles.topBarText}>QUizzes</Text>
			</View>

            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Dostępne quizy</Text>
                <TouchableOpacity onPress={handleSeeAll} style={styles.seeAllButton}>
                    <Text style={styles.seeAllText}>Zobacz wszystkie</Text>
                </TouchableOpacity>
            </View>

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#007AFF" />
                    <Text style={styles.loadingText}>Ładowanie quizów...</Text>
                </View>
            ) : (
                <></>
                <View style={styles.listContainer}>
                    <FlatList
                        data={currentItems}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <QuizItem quiz={item} />}
                        scrollEnabled={false}
                        ListEmptyComponent={
                            <View style={styles.emptyContainer}>
                                <Ionicons name="book-outline" size={64} color="#ccc" />
                                <Text style={styles.emptyText}>Brak dostępnych quizów</Text>
                            </View>
                        }
                    />
                </View>
    {loading ? (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Ładowanie quizów...</Text>
        </View>
    ) : (
        <>
        <View style={styles.listContainer}>
            <FlatList
                data={currentItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <QuizItem quiz={item} />}
                scrollEnabled={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="book-outline" size={64} color="#ccc" />
                        <Text style={styles.emptyText}>Brak dostępnych quizów</Text>
                    </View>
                }
            />
        </View>
        {quizzes.length > QUIZZES_PER_PAGE && (
            <View style={styles.paginationContainer}>
                <TouchableOpacity
                    style={[
                        styles.paginationButton,
                        currentPage === 0 && styles.paginationButtonDisabled,
                    ]}
                    onPress={handlePrevPage}
                    disabled={currentPage === 0}
                >
                    <Ionicons
                        name="chevron-back"
                        size={24}
                        color={currentPage === 0 ? "#ccc" : "#007AFF"}
                    />
                    <Text
                        style={[
                            styles.paginationButtonText,
                            currentPage === 0 && styles.paginationButtonTextDisabled,
                        ]}
                    >
                        Poprzednie
                    </Text>
                </TouchableOpacity>

                <View style={styles.pageInfo}>
                    <Text style={styles.pageInfoText}>
                        {startItem}-{endItem} z {quizzes.length}
                    </Text>
                    <Text style={styles.pageIndicator}>
                        Strona {currentPage + 1} z {totalPages}
                    </Text>
                </View>

                <TouchableOpacity
                    style={[
                        styles.paginationButton,
                        currentPage === totalPages - 1 &&
                        styles.paginationButtonDisabled,
                    ]}
                    onPress={handleNextPage}
                    disabled={currentPage === totalPages - 1}
                >
                    <Text
                        style={[
                            styles.paginationButtonText,
                            currentPage === totalPages - 1 &&
                            styles.paginationButtonTextDisabled,
                        ]}
                    >
                        Następne
                    </Text>
                    <Ionicons
                        name="chevron-forward"
                        size={24}
                        color={currentPage === totalPages - 1 ? "#ccc" : "#007AFF"}
                    />
                </TouchableOpacity>
            </View>
        )}

        </SafeAreaView>
	);
}

